/* Local QA only. Uses an isolated headless browser profile; no npm dependency. */
const {spawn}=require('node:child_process');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
async function browser(executable){
 const profile=await fs.mkdtemp(path.join(os.tmpdir(),'asv-browser-'));
 const proc=spawn(executable||'C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
 const endpoint=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Browser launch timeout')),20000);let out='';proc.stderr.on('data',b=>{out+=b;const m=out.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});proc.on('error',reject);proc.on('exit',c=>{clearTimeout(timer);reject(Error('Browser exited '+c+' '+out.slice(-1000)));});});
 const ws=new WebSocket(endpoint);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let serial=0,session;const pending=new Map(),errors=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
 ws.onclose=()=>{for(const p of pending.values())p.reject(Error('Browser disconnected'));pending.clear();};
 const send=(method,params={},useSession=true)=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params,...(useSession&&session?{sessionId:session}:{})}));});
 const target=await send('Target.createTarget',{url:'about:blank'},false);session=(await send('Target.attachToTarget',{targetId:target.targetId,flatten:true},false)).sessionId;
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text+JSON.stringify(r.exceptionDetails.exception));return r.result.value;};
 const delay=ms=>new Promise(r=>setTimeout(r,ms));
 const wait=async(expression,ms=12000)=>{const end=Date.now()+ms;while(Date.now()<end){try{if(await evaluate(expression))return;}catch{}await delay(100);}throw Error('Timed out: '+expression);};
 return{send,evaluate,delay,wait,errors,async size(width,height){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});},async goto(url){const before=await evaluate('performance.timeOrigin');await send('Page.navigate',{url});await wait('performance.timeOrigin!=='+before+' && document.readyState==="complete"');},async click(selector){const p=await evaluate('(()=>{const e=document.querySelector('+JSON.stringify(selector)+');if(!e)throw Error("Missing element");const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()');await send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});},async screenshot(file){await fs.mkdir(path.dirname(file),{recursive:true});const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(file,Buffer.from(shot.data,'base64'));},async close(){try{await send('Browser.close',{},false);}catch{}ws.close();proc.kill();}};
}
module.exports={browser};
