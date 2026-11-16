/* i18n.js: Bản dịch VI/EN và hàm đổi ngôn ngữ
   - Chữ trong HTML gắn data-i18n="key" → thay textContent.
   - Thuộc tính: data-i18n-alt, data-i18n-aria-label,
     data-i18n-title, data-i18n-placeholder, data-i18n-content.
   - Lựa chọn lưu trong localStorage (khóa "asv-lang"). */

var ASV_TRANSLATIONS = {
  vi: {
    /* Chung */
    "site.name": "Âm Sắc Việt",
    "site.tagline": "Trang web về âm nhạc truyền thống Việt Nam",
    "skip": "Bỏ qua, đến nội dung chính",
    "nav.label": "Điều hướng chính",
    "nav.toggle": "Mở hoặc đóng menu",
    "nav.home": "Trang chủ",
    "nav.genres": "Loại hình",
    "nav.instruments": "Nhạc cụ",
    "nav.history": "Lịch sử",
    "lang.group": "Chọn ngôn ngữ",
    "lang.vi": "Tiếng Việt",
    "lang.en": "English",
    "comingSoon": "Sẽ có trong bản hoàn chỉnh",
    "comingSoon.page": "Trang “{page}” sẽ có trong bản hoàn chỉnh.",

    /* Trình phát âm thanh */
    "player.label": "Trình phát âm thanh",
    "player.stop": "Dừng",
    "player.loading": "Đang tải…",
    "player.recording": "Bản thu",
    "player.synth": "Âm tổng hợp minh họa (chưa có bản thu)",
    "player.nowPlaying": "Đang phát: {title}",
    "player.stopped": "Đã dừng âm thanh.",
    "player.escHint": "Nhấn Esc để dừng",
    "player.noAudio": "Trình duyệt này không hỗ trợ phát âm thanh.",
    "btn.listen": "Nghe",
    "btn.stop": "Dừng",

    /* Ảnh / nhạc cụ */
    "media.placeholder": "Ảnh đang được cập nhật",
    "media.altInstrument": "Ảnh nhạc cụ {name}",
    "media.altGenre": "Ảnh minh họa {name}",
    "media.placeholderAria": "Ô giữ chỗ cho ảnh {name}",
    "family.string": "Dây",
    "family.wind": "Hơi",
    "family.percussion": "Gõ",
    "region.north": "Bắc Bộ",
    "region.central": "Trung Bộ",
    "region.highlands": "Tây Nguyên",
    "region.south": "Nam Bộ",

    /* Video */
    "video.watchHere": "Xem tại đây",
    "video.youtube": "Mở trên YouTube",
    "video.newTab": "(mở tab mới)",
    "video.source": "Video: UNESCO",
    "video.watchAria": "Xem video {name} ngay trong trang",
    "video.openAria": "Mở video {name} trên YouTube (tab mới)",

    /* Mô tả các trang (dùng cho thẻ và "Xem tiếp") */
    "page.home.title": "Trang chủ",
    "page.home.desc": "Quay về ba bức tranh và cây đàn bầu để chọn một lối vào mới.",
    "page.genres.title": "Loại hình",
    "page.genres.desc": "8 loại hình được UNESCO ghi danh, xem trên bản đồ, có video biểu diễn.",
    "page.genres.meta": "Xem bản đồ 8 loại hình",
    "page.instruments.title": "Nhạc cụ",
    "page.instruments.desc": "12 nhạc cụ chia theo dây, hơi, gõ, kèm một cây đàn bầu ảo để bạn tự chơi.",
    "page.instruments.meta": "Xem 12 nhạc cụ",
    "page.history.title": "Lịch sử",
    "page.history.desc": "8 mốc lịch sử, mỗi mốc có năm tháng, nguồn tra cứu và những chỗ còn tranh luận.",
    "page.history.meta": "Xem dòng thời gian",
    "next.title": "Xem tiếp",

    /* Footer */
    "footer.explore": "Các trang",
    "footer.about": "Về dự án",
    "footer.aboutText": "Đồ án môn Tương tác người – máy (HCI/UX). Nội dung phục vụ mục đích học tập.",
    "footer.synthNote": "Âm thanh ghi “Âm tổng hợp minh họa” được tạo bằng Web Audio để gợi tả, không phải bản thu nhạc cụ thật.",
    "footer.motif": "Biểu tượng đàn bầu, tranh và họa tiết nền được vẽ mới cho dự án, phỏng theo phong cách mỹ thuật truyền thống; không phải bản sao của hiện vật hay tác phẩm cụ thể.",
    "footer.videoNote": "Video biểu diễn là của UNESCO, phát từ YouTube; bản quyền thuộc các đơn vị ghi hình.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Lên đầu trang",

    /* Trang Loại hình */
    "genres.meta.title": "Loại hình âm nhạc | Âm Sắc Việt",
    "genres.meta.desc": "Bản đồ 8 loại hình âm nhạc truyền thống Việt Nam được UNESCO ghi danh, kèm mô tả, âm thanh và video biểu diễn.",
    "genres.title": "Các loại hình âm nhạc",
    "genres.lead": "Tám loại hình tiêu biểu đã được UNESCO ghi danh, từ Bắc Bộ vào Nam Bộ. Bấm vào một điểm trên bản đồ để đọc, nghe và xem biểu diễn; chọn một vùng để bản đồ phóng tới vùng đó.",
    "genres.live": "Đang xem: {name}",
    "genres.more": "Ngoài 8 loại hình này, UNESCO còn ghi danh hát văn trong Thực hành tín ngưỡng thờ Mẫu Tam phủ (2016) và Thực hành Then của người Tày, Nùng, Thái (2019).",
    "hist.meta.title": "Lịch sử âm nhạc truyền thống | Âm Sắc Việt",
    "hist.meta.desc": "Tám mốc lịch sử của âm nhạc truyền thống Việt Nam, từ đàn đá, trống đồng đến hôm nay, có năm tháng, nguồn tra cứu và những điểm còn tranh luận.",
    "hist.title": "Lịch sử âm nhạc truyền thống",
    "hist.lead": "Tám mốc lịch sử, mốc đầu là đàn đá và trống đồng, mốc cuối là hôm nay. Mỗi mốc ghi năm, nguồn tra cứu, và tách riêng những điều các nhà nghiên cứu chưa thống nhất.",
    "hist.nav.label": "Chọn thời kỳ",
    "hist.facts": "Sự kiện có năm cụ thể",
    "hist.debate": "Còn tranh luận",
    "hist.sources": "Nguồn tra cứu ({n})",
    "hist.listen": "Nghe, xem và chơi thử",
    "hist.rec": "Bản ghi {name}",
    "hist.read": "Đọc về {name}",
    "hist.try": "Chơi thử {name}",
    "hist.synthNote": "Tiếng nhạc cụ là âm mô phỏng. Bản ghi loại hình là video thật trên kênh UNESCO.",
    "hist.live": "Đang xem: {title}",
    "hist.method.title": "Chúng tôi viết trang này như thế nào",
    "hist.method.text": "Năm tháng được đối chiếu với sử liệu (Đại Việt sử ký toàn thư), Bảo tàng Lịch sử Quốc gia, hồ sơ UNESCO và các bài nghiên cứu đã đăng tạp chí. Điều gì chỉ có trong truyền thuyết hoặc các nguồn còn nói khác nhau thì đưa vào mục “Còn tranh luận”, không viết như sự thật đã chắc chắn. Tám mốc này chỉ là những điểm nổi bật; lịch sử âm nhạc của 54 dân tộc Việt Nam còn rộng hơn nhiều.",
    "media.altHistory": "Hình minh họa: {name}",
    "genres.filter.label": "Lọc theo vùng",
    "genres.filter.all": "Tất cả",
    "genres.count": "Đang hiện {n} loại hình",
    "genres.map.aria": "Bản đồ Việt Nam đánh dấu nơi lưu giữ 8 loại hình",
    "genres.map.hint": "Bấm vào một điểm trên bản đồ, hoặc chọn trong danh sách bên dưới.",
    "genres.map.sea": "Biển Đông",
    "genres.map.hoangSa": "Quần đảo Hoàng Sa",
    "genres.map.truongSa": "Quần đảo Trường Sa",
    "genres.map.source": "Đường biên: Natural Earth. Ba điểm phía Bắc được dời ra cho khỏi chồng nhau; chấm nhỏ là vị trí thật.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Nơi lưu giữ",
    "genres.panel.list": "Ghi danh",
    "genres.panel.instruments": "Nhạc cụ thường dùng",
    "genres.panel.noInstruments": "Chủ yếu là giọng hát, thường không cần nhạc đệm.",
    "genres.panel.media": "Nghe và xem biểu diễn",
    "genres.panel.prev": "Loại hình trước",
    "genres.panel.next": "Loại hình sau",
    "genres.list.title": "Tất cả loại hình",
    "genres.list.lead": "Danh sách dành cho bạn không muốn dùng bản đồ. Bấm vào một thẻ để xem chi tiết.",
    "genres.card.open": "Xem chi tiết",

    /* Trang Nhạc cụ */
    "inst.meta.title": "Nhạc cụ | Âm Sắc Việt",
    "inst.meta.desc": "12 nhạc cụ truyền thống Việt Nam chia theo dây, hơi, gõ, có hình, mô tả, âm thanh và một cây đàn bầu ảo để tự chơi.",
    "inst.title": "Nhạc cụ truyền thống",
    "inst.lead": "12 nhạc cụ quen thuộc, chia theo cách phát ra tiếng. Bấm vào một thẻ để xem chi tiết và nghe thử.",
    "inst.filter.label": "Lọc theo họ nhạc cụ",
    "inst.filter.all": "Tất cả",
    "inst.hint.all": "Nhạc cụ được chia theo cách phát ra tiếng: dây, hơi và gõ.",
    "inst.hint.string": "Dây: tiếng phát ra từ dây căng, được gảy bằng tay, que, móng hoặc kéo bằng cung.",
    "inst.hint.wind": "Hơi: tiếng phát ra từ luồng hơi thổi qua lỗ, qua lưỡi gà hoặc qua dăm kèn.",
    "inst.hint.percussion": "Gõ: tiếng phát ra khi gõ vào mặt da căng (trống) hoặc vào chính thân nhạc cụ (phách, chiêng, ống tre).",
    "inst.search.label": "Tìm theo tên",
    "inst.search.placeholder": "Ví dụ: đàn bầu, sáo, khèn",
    "inst.search.hint": "Gõ có dấu hay không dấu đều được.",
    "inst.count": "Đang hiện {n} nhạc cụ",
    "inst.empty.title": "Không tìm thấy nhạc cụ nào",
    "inst.empty.text": "Không có nhạc cụ nào khớp với “{q}” trong nhóm đang chọn.",
    "inst.empty.reset": "Xóa tìm kiếm và bộ lọc",
    "inst.card.open": "Xem chi tiết",
    "inst.modal.close": "Đóng",
    "inst.modal.branch": "Nhánh",
    "inst.modal.people": "Dân tộc",
    "inst.modal.material": "Chất liệu",
    "inst.modal.play": "Cách chơi",
    "inst.modal.genres": "Có trong loại hình",
    "inst.modal.noGenres": "Không có trong 8 loại hình ở trang Loại hình.",
    "inst.modal.prev": "Nhạc cụ trước",
    "inst.modal.next": "Nhạc cụ sau",
    "inst.bau.title": "Đàn bầu ảo",
    "inst.play.title": "Chơi thử nhạc cụ",
    "inst.play.lead": "Chọn một nhạc cụ rồi bấm, giữ hoặc vuốt như khi chơi thật. Trên máy tính có thể dùng phím số 1 đến 9.",
    "inst.play.disclaimer": "Đây là âm mô phỏng bằng máy tính để bạn hình dung cách chơi, không thay được tiếng nhạc cụ thật. Muốn nghe nghệ nhân biểu diễn, hãy mở các bản ghi của UNESCO ở trang Loại hình.",
    "inst.play.picker": "Chọn nhạc cụ để chơi",
    "inst.play.now": "{name}: {note}",
    "inst.play.playerTitle": "Chơi thử: {name}",
    "inst.modal.try": "Chơi thử {name}",
    "inst.how.dan-tranh": "Bấm vào một dây, hoặc giữ rồi vuốt qua các dây để nghe chuỗi nốt lả lướt như người chơi đàn tranh. Dây đàn tranh lên theo năm cung, nên vuốt thế nào cũng nghe thuận tai.",
    "inst.how.dan-nguyet": "Bấm vào từng phím trên cần đàn để gảy. Đàn nguyệt có phím cao, mỗi phím cho một nốt.",
    "inst.how.dan-nhi": "Đàn nhị không có phím: giữ ngón ở một chấm trên cần đàn để kéo cung, nhả ra là dừng. Giữ rồi trượt dọc cần đàn để nghe tiếng luyến.",
    "inst.how.ty-ba": "Bấm nhanh vào một phím để gảy một tiếng. Giữ lâu hơn để vê, tức gảy liên tục rất nhanh như mưa rơi.",
    "inst.how.sao-truc": "Giữ một lỗ bấm trên thân sáo để thổi, nhả ra là dừng. Giữ rồi trượt sang lỗ khác để luyến.",
    "inst.how.khen": "Giữ một ống để thổi. Mỗi ống vang cùng ống trì âm (nốt Rê thấp, ống bên trái), nên khèn luôn nghe nhiều nốt cùng lúc.",
    "inst.how.ken-bau": "Giữ một lỗ bấm trên thân kèn để thổi, trượt sang lỗ khác để luyến như kèn bầu.",
    "inst.how.trong": "Gõ giữa mặt trống ra tiếng “Tùng”, gần mép da ra “Tùng nhỏ”, gõ vào vành gỗ (tang trống) ra tiếng “Cắc”.",
    "inst.how.phach": "Gõ xen kẽ tiếng chắc và tiếng nhẹ để giữ nhịp, như ca nương gõ phách.",
    "inst.how.dan-trung": "Bấm từng ống, hoặc giữ rồi vuốt qua các ống. Ống dài tiếng trầm, ống ngắn tiếng cao.",
    "inst.how.cong-chieng": "Mỗi chiếc giữ một cao độ. Gõ lần lượt hoặc xen kẽ để nghe các tiếng đan vào nhau như một dàn chiêng.",
    "inst.pad.tung": "Tùng · giữa mặt trống",
    "inst.pad.cac": "Cắc · tang trống",
    "inst.pad.tungNho": "Tùng nhỏ",
    "inst.pad.phachChac": "Tiếng chắc",
    "inst.pad.phachNhe": "Tiếng nhẹ",
    "inst.pad.cong": "Cồng có núm",
    "inst.pad.gong": "Chiêng",
    "inst.bau.lead": "Người chơi đàn bầu đẩy, kéo cần đàn trong lúc dây còn ngân để tiếng đàn lượn lên xuống. Bấm “Gảy dây”, rồi kéo thanh trượt cần đàn để nghe.",
    "inst.bau.pluck": "Gảy dây",
    "inst.bau.harmonics": "Chọn âm",
    "inst.bau.open": "Âm thực",
    "inst.bau.explain": "Âm thực là tiếng dây buông, gảy mà không chạm điểm nút. Âm bồi trong và cao hơn, có được khi cạnh bàn tay chạm nhẹ vào điểm nút trên dây. Đàn bầu dùng âm bồi là chủ yếu.",
    "inst.bau.harmonic": "Bồi âm {n}",
    "inst.bau.rod": "Cần đàn",
    "inst.bau.rodHint": "Kéo sang phải: dây căng, tiếng cao lên. Kéo sang trái: dây chùng, tiếng thấp xuống. Dùng phím mũi tên cũng được.",
    "inst.bau.note": "Đang nghe: {note}",
    "inst.bau.ready": "Bấm “Gảy dây” để bắt đầu",
    "inst.bau.playerTitle": "Đàn bầu ảo",
    "gloss.title": "Thuật ngữ",
    "gloss.lead": "Trong bài, các từ chuyên môn có gạch chấm bên dưới. Bấm vào để xem giải thích ngắn; danh sách đầy đủ ở đây.",
    "gloss.all": "Xem tất cả thuật ngữ",
    "gloss.close": "Đóng",
    "scale.title": "Năm âm và bảy âm",
    "scale.lead": "Bấm “Nghe cả thang” ở từng hàng rồi so sánh. Hai hàng xếp thẳng cột theo cao độ, nên thấy ngay thang năm âm bỏ những nốt nào.",
    "scale.penta": "Thang năm âm (ngũ cung)",
    "scale.hepta": "Thang bảy âm",
    "scale.run": "Nghe cả thang",
    "scale.timbre": "Chọn âm sắc",
    "scale.timbre.tranh": "Tiếng đàn tranh",
    "scale.timbre.sao": "Tiếng sáo",
    "scale.missing": "Không có nốt {note}",
    "scale.steps.penta": "Khoảng cách giữa các nốt: 1 · 1½ · 1 · 1 · 1½ cung",
    "scale.steps.hepta": "Khoảng cách giữa các nốt: 1 · 1 · ½ · 1 · 1 · 1 · ½ cung",
    "scale.explain1": "Thang bảy âm Đô Rê Mi Fa Sol La Si có hai chỗ hai nốt chỉ cách nhau nửa cung: Mi–Fa và Si–Đô (tô đậm ở hàng dưới). Thang năm âm ở hàng trên bỏ Mi và Si, nên không còn bước nửa cung nào; các bước chỉ là một cung hoặc một cung rưỡi. Nhiều làn điệu dân ca Việt Nam được xây trên thang năm âm.",
    "scale.explain2": "Dây đàn tranh ở phần chơi thử dùng đúng năm nốt này (bắt đầu từ Rê: Rê, Fa, Sol, La, Đô), vì vậy vuốt kiểu gì cũng nghe thuận tai.",
    "scale.explain3": "Đây chỉ là phần đơn giản nhất. Nhạc cổ truyền còn có các “hơi”, như hơi Bắc, hơi Nam, với cách nhấn nhá và cao độ riêng mà đàn phím không chơi đúng được.",
    "scale.try": "Thử vuốt đàn tranh",
    "rec.title": "Ghi lại phần bạn chơi",
    "rec.lead": "Bấm “Ghi”, chơi tối đa 60 giây rồi bấm “Dừng ghi”. Trang chỉ ghi lại các lần bạn bấm, không thu âm từ micro.",
    "rec.start": "Ghi",
    "rec.stop": "Dừng ghi",
    "rec.play": "Nghe lại",
    "rec.playStop": "Dừng nghe",
    "rec.save": "Lưu vào máy",
    "rec.share": "Tạo link chia sẻ",
    "rec.recording": "Đang ghi… {time}",
    "rec.empty": "Chưa ghi được nốt nào. Bấm “Ghi” rồi chơi thử.",
    "rec.ready": "Bản ghi: {name}, {n} nốt, dài {time}.",
    "rec.full": "Đã đủ 60 giây nên tự dừng ghi. Bản ghi: {name}, {n} nốt.",
    "rec.playing": "Đang nghe lại…",
    "rec.shared": "Có một bản ghi được gửi cho bạn: {name}, {n} nốt, dài {time}. Bấm “Nghe lại” để nghe.",
    "rec.badLink": "Link bản ghi không đọc được (có thể bị cắt mất một đoạn).",
    "rec.saved": "Đã lưu. Bản ghi nằm trong trình duyệt của máy này, tối đa 5 bản mới nhất.",
    "rec.deleted": "Đã xóa bản ghi.",
    "rec.copied": "Đã chép link. Dán vào tin nhắn để gửi.",
    "rec.copyFail": "Không chép tự động được. Hãy chép link trong ô bên dưới.",
    "rec.linkLabel": "Link chia sẻ",
    "rec.linkNote": "Người nhận mở được link khi trang đã đưa lên web. Nếu bạn đang mở trang trực tiếp từ máy, link chỉ dùng được trên chính máy này.",
    "rec.savedTitle": "Đã lưu trên máy này",
    "rec.none": "Chưa lưu bản nào.",
    "rec.item": "{name} · {n} nốt · {time} · {date}",
    "rec.listen": "Nghe",
    "rec.del": "Xóa",
    "rec.delAria": "Xóa bản ghi {name} lúc {date}",

    /* Trang chủ */
    "home.meta.title": "Âm Sắc Việt | Âm nhạc truyền thống Việt Nam",
    "home.meta.desc": "Âm nhạc truyền thống Việt Nam: 8 loại hình có bản ghi của UNESCO, 12 nhạc cụ chơi thử được, 8 mốc lịch sử có nguồn.",
    "home.hero.title": "Nghe nhạc truyền thống của ba miền",
    "home.hero.lead": "Ba bức tranh là ba miền Bắc, Trung, Nam. Bấm vào tranh để nghe bản ghi của UNESCO, hoặc gảy thử cây đàn bầu bên dưới.",
    "home.hero.cta": "Bắt đầu khám phá",
    "home.hero.cta2": "Chơi thử đàn bầu",
    "home.play.title": "Tự chơi đàn bầu",
    "home.play.text": "Gảy dây rồi kéo cần đàn để nghe tiếng đàn uốn lượn như giọng người. Không cần biết nhạc lý.",
    "home.play.cta": "Chơi thử ngay",
    "home.screen.north": "Bắc Bộ",
    "home.screen.northSub": "Quan họ Bắc Ninh",
    "home.screen.hint": "Bấm vào tranh để nghe bản ghi thật của UNESCO, bấm tên phía trên để xem loại hình đó.",
    "home.screen.badge": "Nghe bản ghi",
    "home.screen.rec": "Nghe bản ghi thật của UNESCO: {name}",
    "home.screen.recExternal": "Nghe bản ghi thật của UNESCO: {name} (mở YouTube ở tab mới)",
    "rec.close": "Đóng",
    "rec.title": "{name}: bản ghi của UNESCO",
    "home.screen.northAlt": "Tranh minh họa: liền anh, liền chị hát quan họ trên thuyền, phía xa là mái đình và đồi Kinh Bắc.",
    "home.screen.central": "Trung Bộ",
    "home.screen.centralSub": "Nhã nhạc cung đình Huế",
    "home.screen.centralAlt": "Tranh minh họa: đò treo đèn lồng trên sông Hương dưới trăng, bên bờ có ngọn tháp và đôi hạc bay.",
    "home.screen.south": "Nam Bộ",
    "home.screen.southSub": "Đờn ca tài tử",
    "home.screen.southAlt": "Tranh minh họa: người đờn đàn kìm và người ca ngồi trên chiếu bên bờ sông, sau lưng là hàng dừa và nhà lá.",
    "home.bau.label": "Cây đàn bầu. Bấm vào dây đàn ở các vị trí khác nhau để nghe; với bàn phím, nhấn Enter để gảy lần lượt.",
    "home.bau.hint": "Chạm vào dây đàn để nghe. Chạm gần trục lên dây ra âm bồi trong và cao; chạm gần cần đàn ra âm thực (dây buông).",
    "home.bau.open": "Âm thực (dây buông)",
    "home.bau.harmonic": "Bồi âm thứ {n}",
    "home.bau.title": "Đàn bầu, bồi âm thứ {n}",
    "home.bau.titleOpen": "Đàn bầu, âm thực",
    "home.video.title": "Xem nghệ nhân biểu diễn",
    "home.video.lead": "Ba đoạn video của UNESCO, mỗi miền một loại hình. Cần có Internet để xem.",
    "home.video.fileNote": "Bạn đang mở trang trực tiếp từ máy, nên YouTube không cho phát video ngay trong trang; video sẽ mở ở tab mới. Khi đưa trang lên web (ví dụ GitHub Pages), video phát được tại chỗ.",
    "home.video.all": "Xem cả 8 loại hình",
    "welcome.tagline": "Đồ án môn HCI về âm nhạc truyền thống Việt Nam",
    "welcome.enter": "Vào thăm ngay",
    "welcome.hint": "hoặc lăn chuột, vuốt màn hình để vào",
    "home.paths.title": "Bắt đầu từ đâu?",
    "home.paths.lead": "Bạn có thể đi theo vùng đất, theo từng cây đàn, hoặc theo dòng lịch sử.",
    "home.today.title": "Nghe thử một nhạc cụ",
    "home.today.lead": "Trang chọn ngẫu nhiên một trong 12 nhạc cụ. Muốn nghe cây khác thì bấm “Chọn nhạc cụ khác”.",
    "home.today.material": "Chất liệu",
    "home.today.play": "Cách chơi",
    "home.today.another": "Chọn nhạc cụ khác",
    "home.today.more": "Xem trong trang Nhạc cụ",
  },

  en: {
    /* Common */
    "site.name": "Âm Sắc Việt",
    "site.tagline": "A website about traditional Vietnamese music",
    "skip": "Skip to main content",
    "nav.label": "Main navigation",
    "nav.toggle": "Open or close menu",
    "nav.home": "Home",
    "nav.genres": "Genres",
    "nav.instruments": "Instruments",
    "nav.history": "History",
    "lang.group": "Choose language",
    "lang.vi": "Tiếng Việt",
    "lang.en": "English",
    "comingSoon": "Coming in the full version",
    "comingSoon.page": "The “{page}” page is coming in the full version.",

    /* Audio player */
    "player.label": "Audio player",
    "player.stop": "Stop",
    "player.loading": "Loading…",
    "player.recording": "Recording",
    "player.synth": "Synthesised preview (no recording yet)",
    "player.nowPlaying": "Now playing: {title}",
    "player.stopped": "Sound stopped.",
    "player.escHint": "Press Esc to stop",
    "player.noAudio": "This browser cannot play audio.",
    "btn.listen": "Listen",
    "btn.stop": "Stop",

    /* Media / instruments */
    "media.placeholder": "Photo coming soon",
    "media.altInstrument": "Photo of the {name}",
    "media.altGenre": "Illustration of {name}",
    "media.placeholderAria": "Placeholder for a photo of {name}",
    "family.string": "String",
    "family.wind": "Wind",
    "family.percussion": "Percussion",
    "region.north": "Northern Vietnam",
    "region.central": "Central Vietnam",
    "region.highlands": "Central Highlands",
    "region.south": "Southern Vietnam",

    /* Video */
    "video.watchHere": "Watch here",
    "video.youtube": "Open on YouTube",
    "video.newTab": "(opens in a new tab)",
    "video.source": "Video: UNESCO",
    "video.watchAria": "Watch the {name} video on this page",
    "video.openAria": "Open the {name} video on YouTube (new tab)",

    /* Page descriptions */
    "page.home.title": "Home",
    "page.home.desc": "Back to the three paintings and the đàn bầu to choose another way in.",
    "page.genres.title": "Genres",
    "page.genres.desc": "8 genres inscribed by UNESCO, shown on a map, with performance videos.",
    "page.genres.meta": "See the map of 8 genres",
    "page.instruments.title": "Instruments",
    "page.instruments.desc": "12 instruments grouped as string, wind and percussion, plus a virtual đàn bầu you can play.",
    "page.instruments.meta": "See the 12 instruments",
    "page.history.title": "History",
    "page.history.desc": "8 milestones, each with dates, sources and the points still under debate.",
    "page.history.meta": "See the timeline",
    "next.title": "Where next",

    /* Footer */
    "footer.explore": "Pages",
    "footer.about": "About",
    "footer.aboutText": "A Human–Computer Interaction (HCI/UX) course project. Content is for learning purposes.",
    "footer.synthNote": "Sounds labelled “Synthesised preview” are generated with Web Audio as a hint, not real instrument recordings.",
    "footer.motif": "The đàn bầu emblem, paintings and background patterns were drawn for this project in a traditional style; they are not copies of any specific artefact or artwork.",
    "footer.videoNote": "Performance videos belong to UNESCO and play from YouTube; rights remain with the producers.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Back to top",

    /* Genres page */
    "genres.meta.title": "Musical genres | Âm Sắc Việt",
    "genres.meta.desc": "A map of 8 traditional Vietnamese musical genres inscribed by UNESCO, with descriptions, sounds and performance videos.",
    "genres.title": "Musical genres",
    "genres.lead": "Eight key genres inscribed by UNESCO, from the north to the south. Press a point on the map to read, listen and watch; pick a region and the map zooms in on it.",
    "genres.live": "Now showing: {name}",
    "genres.more": "Besides these 8, UNESCO has also inscribed hát văn singing, part of the Mother Goddess worship practices (2016), and the Then practices of the Tày, Nùng and Thái peoples (2019).",
    "hist.meta.title": "History of traditional music | Âm Sắc Việt",
    "hist.meta.desc": "Eight milestones in the history of traditional Vietnamese music, from stone lithophones and bronze drums to today, with dates, sources and the points still under debate.",
    "hist.title": "A history of traditional music",
    "hist.lead": "Eight milestones, starting with stone lithophones and bronze drums and ending with today. Each one gives dates and sources, and keeps apart the points researchers still disagree on.",
    "hist.nav.label": "Choose a period",
    "hist.facts": "Dated events",
    "hist.debate": "Still debated",
    "hist.sources": "Sources ({n})",
    "hist.listen": "Listen, watch and play",
    "hist.rec": "Recording: {name}",
    "hist.read": "Read about {name}",
    "hist.try": "Play the {name}",
    "hist.synthNote": "Instrument sounds are simulated. Genre recordings are real videos on UNESCO's channel.",
    "hist.live": "Now viewing: {title}",
    "hist.method.title": "How we wrote this page",
    "hist.method.text": "Dates are checked against historical records (the Đại Việt sử ký toàn thư chronicle), the National Museum of Vietnamese History, UNESCO files and published research. Anything that comes only from legend, or where sources disagree, goes under “Still debated” instead of being stated as settled fact. These eight milestones are only highlights; the musical history of Vietnam's 54 ethnic groups is far wider.",
    "media.altHistory": "Illustration: {name}",
    "genres.filter.label": "Filter by region",
    "genres.filter.all": "All",
    "genres.count": "Showing {n} genres",
    "genres.map.aria": "Map of Vietnam marking where the 8 genres are kept alive",
    "genres.map.hint": "Press a point on the map, or pick one from the list below.",
    "genres.map.sea": "Biển Đông (East Sea)",
    "genres.map.hoangSa": "Hoàng Sa Archipelago",
    "genres.map.truongSa": "Trường Sa Archipelago",
    "genres.map.source": "Borders: Natural Earth. The three northern markers are spread out so they don't overlap; the small dots show the real places.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Where it lives",
    "genres.panel.list": "Inscribed on",
    "genres.panel.instruments": "Common instruments",
    "genres.panel.noInstruments": "Mostly voices, usually sung without accompaniment.",
    "genres.panel.media": "Listen and watch",
    "genres.panel.prev": "Previous genre",
    "genres.panel.next": "Next genre",
    "genres.list.title": "All genres",
    "genres.list.lead": "A list for anyone who prefers not to use the map. Press a card to see the details.",
    "genres.card.open": "See details",

    /* Instruments page */
    "inst.meta.title": "Instruments | Âm Sắc Việt",
    "inst.meta.desc": "12 traditional Vietnamese instruments grouped as string, wind and percussion, with pictures, descriptions, sounds and a virtual đàn bầu to play.",
    "inst.title": "Traditional instruments",
    "inst.lead": "12 well-known instruments, grouped by how they make sound. Press a card to see the details and listen.",
    "inst.filter.label": "Filter by instrument family",
    "inst.filter.all": "All",
    "inst.hint.all": "Instruments are grouped by how they make sound: string, wind and percussion.",
    "inst.hint.string": "String: the sound comes from a stretched string, plucked with fingers, a stick or picks, or bowed.",
    "inst.hint.wind": "Wind: the sound comes from breath blown across a hole, through a reed or through a double reed.",
    "inst.hint.percussion": "Percussion: the sound comes from striking a stretched skin (drums) or the body of the instrument itself (clappers, gongs, bamboo tubes).",
    "inst.search.label": "Search by name",
    "inst.search.placeholder": "For example: đàn bầu, sáo, khèn",
    "inst.search.hint": "You can type with or without Vietnamese accents.",
    "inst.count": "Showing {n} instruments",
    "inst.empty.title": "No instruments found",
    "inst.empty.text": "No instrument matches “{q}” in the selected family.",
    "inst.empty.reset": "Clear search and filter",
    "inst.card.open": "See details",
    "inst.modal.close": "Close",
    "inst.modal.branch": "Type",
    "inst.modal.people": "People",
    "inst.modal.material": "Materials",
    "inst.modal.play": "How it is played",
    "inst.modal.genres": "Heard in",
    "inst.modal.noGenres": "Not part of the 8 genres on the Genres page.",
    "inst.modal.prev": "Previous instrument",
    "inst.modal.next": "Next instrument",
    "inst.bau.title": "Virtual đàn bầu",
    "inst.play.title": "Play the instruments",
    "inst.play.lead": "Pick an instrument, then press, hold or swipe the way a player would. On a computer you can also use the number keys 1 to 9.",
    "inst.play.disclaimer": "These are computer-simulated sounds to help you imagine how each instrument is played; they are not a substitute for the real instruments. To hear master performers, open the UNESCO recordings on the Genres page.",
    "inst.play.picker": "Choose an instrument to play",
    "inst.play.now": "{name}: {note}",
    "inst.play.playerTitle": "Playing: {name}",
    "inst.modal.try": "Play the {name}",
    "inst.how.dan-tranh": "Press a string, or hold and swipe across the strings for a flowing run like a đàn tranh player. The strings are tuned to a five-note scale, so any swipe sounds natural.",
    "inst.how.dan-nguyet": "Press each fret on the neck to pluck. The đàn nguyệt has very high frets, one note each.",
    "inst.how.dan-nhi": "The đàn nhị has no frets: hold a dot on the neck to draw the bow, let go to stop. Hold and slide along the neck to glide.",
    "inst.how.ty-ba": "Tap quickly to pluck once. Hold longer for the vê tremolo, a fast, continuous plucking like falling rain.",
    "inst.how.sao-truc": "Hold a finger hole to blow; let go to stop. Hold and slide to another hole to glide.",
    "inst.how.khen": "Hold a pipe to blow. Each pipe sounds together with the drone pipe (a low D, on the left), so the khèn always plays several notes at once.",
    "inst.how.ken-bau": "Hold a finger hole on the body to blow; slide to another hole to glide like a kèn bầu.",
    "inst.how.trong": "Strike the centre of the drumhead for “Tùng”, near its edge for a soft “Tùng”, and the wooden rim for “Cắc”.",
    "inst.how.phach": "Alternate the strong and the light stroke to keep time, the way a ca trù singer plays the phách.",
    "inst.how.dan-trung": "Press each tube, or hold and swipe across them. Long tubes sound low, short tubes sound high.",
    "inst.how.cong-chieng": "Each gong has its own pitch. Strike them one after another or in turn to hear the sounds interlock like a gong ensemble.",
    "inst.pad.tung": "Tùng · drumhead",
    "inst.pad.cac": "Cắc · rim",
    "inst.pad.tungNho": "Soft tùng",
    "inst.pad.phachChac": "Strong stroke",
    "inst.pad.phachNhe": "Light stroke",
    "inst.pad.cong": "Bossed cồng",
    "inst.pad.gong": "Chiêng",
    "inst.bau.lead": "Đàn bầu players push and pull the rod while the string is still ringing, so the note glides up and down. Press “Pluck”, then drag the rod slider to hear it.",
    "inst.bau.pluck": "Pluck",
    "inst.bau.harmonics": "Choose a sound",
    "inst.bau.open": "Open string",
    "inst.bau.explain": "The open string (âm thực) is plucked without touching any node. Harmonics (âm bồi) are clearer and higher: the edge of the hand lightly touches a node on the string. The đàn bầu is played mostly with harmonics.",
    "inst.bau.harmonic": "Harmonic {n}",
    "inst.bau.rod": "Rod",
    "inst.bau.rodHint": "Drag right: the string tightens and the note rises. Drag left: it loosens and the note falls. Arrow keys work too.",
    "inst.bau.note": "Now sounding: {note}",
    "inst.bau.ready": "Press “Pluck” to start",
    "inst.bau.playerTitle": "Virtual đàn bầu",
    "gloss.title": "Glossary",
    "gloss.lead": "Technical words in the text have a dotted underline. Press one for a short explanation; the full list is here.",
    "gloss.all": "See all terms",
    "gloss.close": "Close",
    "scale.title": "Five notes and seven notes",
    "scale.lead": "Press “Play the scale” on each row and compare. The rows line up by pitch, so you can see at once which notes the five-note scale leaves out.",
    "scale.penta": "Five-note scale (pentatonic)",
    "scale.hepta": "Seven-note scale",
    "scale.run": "Play the scale",
    "scale.timbre": "Choose a sound",
    "scale.timbre.tranh": "Đàn tranh sound",
    "scale.timbre.sao": "Flute sound",
    "scale.missing": "No {note}",
    "scale.steps.penta": "Steps between notes: 1 · 1½ · 1 · 1 · 1½ tones",
    "scale.steps.hepta": "Steps between notes: 1 · 1 · ½ · 1 · 1 · 1 · ½ tones",
    "scale.explain1": "The seven-note scale C D E F G A B has two places where neighbouring notes are only a semitone apart: E–F and B–C (marked on the lower row). The five-note scale on the upper row leaves out E and B, so it has no semitone steps at all, only whole tones and tone-and-a-half steps. Many Vietnamese folk melodies are built on a five-note scale.",
    "scale.explain2": "The đàn tranh strings in the playing section use exactly these five notes (starting on D: D, F, G, A, C), which is why any swipe sounds natural.",
    "scale.explain3": "This is only the simplest part. Traditional music also has modes called “hơi”, such as hơi Bắc and hơi Nam, with their own ornaments and pitches that a keyboard cannot play exactly.",
    "scale.try": "Try swiping the đàn tranh",
    "rec.title": "Record what you play",
    "rec.lead": "Press “Record”, play for up to 60 seconds, then press “Stop recording”. The page only records your key presses; it does not use the microphone.",
    "rec.start": "Record",
    "rec.stop": "Stop recording",
    "rec.play": "Play back",
    "rec.playStop": "Stop playback",
    "rec.save": "Save on this device",
    "rec.share": "Make a share link",
    "rec.recording": "Recording… {time}",
    "rec.empty": "No notes were recorded. Press “Record” and play something.",
    "rec.ready": "Recording: {name}, {n} notes, {time} long.",
    "rec.full": "60 seconds reached, so recording stopped. Recording: {name}, {n} notes.",
    "rec.playing": "Playing back…",
    "rec.shared": "Someone sent you a recording: {name}, {n} notes, {time} long. Press “Play back” to hear it.",
    "rec.badLink": "This recording link could not be read (part of it may be missing).",
    "rec.saved": "Saved. The recording is kept in this browser, up to the 5 most recent.",
    "rec.deleted": "Recording deleted.",
    "rec.copied": "Link copied. Paste it into a message to share.",
    "rec.copyFail": "Could not copy automatically. Copy the link from the box below.",
    "rec.linkLabel": "Share link",
    "rec.linkNote": "The link works for others once the site is online. If you opened the page straight from your computer, the link only works on this computer.",
    "rec.savedTitle": "Saved on this device",
    "rec.none": "Nothing saved yet.",
    "rec.item": "{name} · {n} notes · {time} · {date}",
    "rec.listen": "Play",
    "rec.del": "Delete",
    "rec.delAria": "Delete the {name} recording from {date}",

    /* Home */
    "home.meta.title": "Âm Sắc Việt | Traditional music of Vietnam",
    "home.meta.desc": "Traditional Vietnamese music: 8 genres with UNESCO recordings, 12 instruments you can try, 8 historical milestones with sources.",
    "home.hero.title": "Traditional music from three regions",
    "home.hero.lead": "The three paintings are the North, the Centre and the South. Press a painting to hear a UNESCO recording, or pluck the đàn bầu below it.",
    "home.hero.cta": "Start exploring",
    "home.hero.cta2": "Play the đàn bầu",
    "home.play.title": "Play the đàn bầu yourself",
    "home.play.text": "Pluck the string, then move the rod to hear the note glide like a human voice. No music theory needed.",
    "home.play.cta": "Try it now",
    "home.screen.north": "Northern Vietnam",
    "home.screen.northSub": "Quan họ Bắc Ninh folk songs",
    "home.screen.hint": "Press a painting to hear a real UNESCO recording, or press the name above it to read about that genre.",
    "home.screen.badge": "Hear recording",
    "home.screen.rec": "Hear a real UNESCO recording: {name}",
    "home.screen.recExternal": "Hear a real UNESCO recording: {name} (opens YouTube in a new tab)",
    "rec.close": "Close",
    "rec.title": "{name}: UNESCO recording",
    "home.screen.northAlt": "Illustration: men and women singing quan họ on a boat, with a communal-house roof and the hills of Kinh Bắc behind.",
    "home.screen.central": "Central Vietnam",
    "home.screen.centralSub": "Nhã nhạc, Huế royal court music",
    "home.screen.centralAlt": "Illustration: a lantern-lit boat on the Hương River under the moon, with a tower on the bank and two cranes in flight.",
    "home.screen.south": "Southern Vietnam",
    "home.screen.southSub": "Đờn ca tài tử music",
    "home.screen.southAlt": "Illustration: a đàn kìm player and a singer on a mat by the river, with coconut palms and a thatched house behind.",
    "home.bau.label": "A đàn bầu. Press the string at different spots to hear it; with a keyboard, press Enter to pluck in turn.",
    "home.bau.hint": "Touch the string to hear it. Near the tuning peg you get clear, high harmonics; near the rod you get the open string (âm thực).",
    "home.bau.open": "Open string (âm thực)",
    "home.bau.harmonic": "Harmonic {n}",
    "home.bau.title": "Đàn bầu, harmonic {n}",
    "home.bau.titleOpen": "Đàn bầu, open string",
    "home.video.title": "Watch artists perform",
    "home.video.lead": "Three UNESCO videos, one genre from each region. You need Internet to watch them.",
    "home.video.fileNote": "You opened this page straight from your computer, so YouTube won't play videos inside it; they open in a new tab instead. Once the site is online (for example on GitHub Pages), videos play right here.",
    "home.video.all": "See all 8 genres",
    "welcome.tagline": "An HCI course project about traditional Vietnamese music",
    "welcome.enter": "Visit now",
    "welcome.hint": "or scroll / swipe to enter",
    "home.paths.title": "Where to start?",
    "home.paths.lead": "Follow the regions, the instruments, or the history.",
    "home.today.title": "Try one instrument",
    "home.today.lead": "The page picks one of the 12 instruments at random. Press “Pick another instrument” to hear a different one.",
    "home.today.material": "Materials",
    "home.today.play": "How it is played",
    "home.today.another": "Pick another instrument",
    "home.today.more": "See it on the Instruments page",
  }
};

/* Bộ máy đổi ngôn ngữ */
var I18n = (function () {
  var STORAGE_KEY = "asv-lang";
  var SUPPORTED = ["vi", "en"];

  // Đọc/ghi localStorage an toàn (có trình duyệt chặn khi mở file://)
  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* bỏ qua */ }
  }

  // Ngôn ngữ ban đầu: lựa chọn đã lưu → ngôn ngữ trình duyệt → tiếng Việt
  function detect() {
    var saved = readSaved();
    if (SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "vi").toLowerCase();
    return nav.indexOf("vi") === 0 ? "vi" : "en";
  }

  var current = detect();

  // Bản tiếng Anh không dùng dấu tiếng Việt: "đàn bầu" → "dan bau", "sông Hương" → "Huong".
  // Tên site cũng bỏ dấu ("Am Sac Viet"); chỉ tên nút "Tiếng Việt" giữ dấu cho người Việt dễ nhận ra.
  var KEEP_MARKS = { "lang.vi": true };
  function plain(text) {
    if (typeof text !== "string") return text;
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D").normalize("NFC");
  }
  function forLang(text) { return current === "en" ? plain(text) : text; }
  document.documentElement.lang = current; // đặt sớm để trình đọc màn hình đọc đúng giọng

  // Lấy bản dịch theo khóa; {ten} trong chuỗi được thay bằng vars.ten
  function t(key, vars) {
    var dict = ASV_TRANSLATIONS[current] || {};
    var text = dict[key];
    if (text === undefined) text = ASV_TRANSLATIONS.vi[key];
    if (text === undefined) return key; // thiếu khóa → hiện tên khóa để dễ phát hiện
    if (vars) {
      text = text.replace(/\{(\w+)\}/g, function (m, name) {
        return vars[name] !== undefined ? vars[name] : m;
      });
    }
    return KEEP_MARKS[key] ? text : forLang(text);
  }

  // Chọn đúng ngôn ngữ trong dữ liệu dạng { vi: "...", en: "..." }
  function pick(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return forLang(value); // tên riêng dùng chung (ví dụ "Đàn bầu")
    return forLang(value[current] !== undefined ? value[current] : value.vi);
  }

  // Các thuộc tính cần dịch: tên data-* → tên thuộc tính HTML
  var ATTRS = {
    "data-i18n-alt": "alt",
    "data-i18n-aria-label": "aria-label",
    "data-i18n-title": "title",
    "data-i18n-placeholder": "placeholder",
    "data-i18n-content": "content"
  };

  // Dịch toàn bộ phần tử trong root (mặc định cả trang)
  function apply(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }
    Object.keys(ATTRS).forEach(function (dataAttr) {
      var els = root.querySelectorAll("[" + dataAttr + "]");
      for (var j = 0; j < els.length; j++) {
        els[j].setAttribute(ATTRS[dataAttr], t(els[j].getAttribute(dataAttr)));
      }
    });
  }

  // Đổi ngôn ngữ: lưu, đổi <html lang>, dịch lại, báo cho các trang vẽ lại
  function set(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    save(lang);
    document.documentElement.lang = lang;
    apply(document);
    document.dispatchEvent(new CustomEvent("asv:langchange", { detail: { lang: lang } }));
  }

  return {
    t: t,
    pick: pick,
    plain: plain,
    apply: apply,
    set: set,
    get lang() { return current; }
  };
})();
