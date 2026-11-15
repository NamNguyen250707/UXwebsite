/* data.js: Dữ liệu dùng chung cho cả site (biến toàn cục)
   - Không dùng fetch(): dữ liệu nằm sẵn trong file này để
     site chạy được khi mở trực tiếp bằng file://.
   - Chữ hiển thị viết dạng { vi: "...", en: "..." }.
   - Tên riêng (đàn bầu, ca trù…) giữ nguyên dấu ở cả hai ngôn ngữ.
   - "[CẦN KIỂM CHỨNG]" = chi tiết cần tra lại trước khi nộp.
   - image: nhạc cụ dùng hình vẽ SVG trong images/nhac-cu/ (scripts/draw-instruments.cjs).
   - image của loại hình: cảnh vẽ SVG trong images/loai-hinh/ (scripts/draw-genres.cjs).
   - audio: đường dẫn để sẵn. Chưa có file → site tự hiện
     ô giữ chỗ và phát âm tổng hợp (preset trong "synth").
   - Không tách âm thanh từ video YouTube (bản quyền của UNESCO và đơn vị quay);
     muốn có bản thu thật thì dùng file có giấy phép, thả vào audio/. */

var ASV_DATA = {
  /* true = tô vàng các chỗ [CẦN KIỂM CHỨNG] trên trang; đổi thành false khi đã tra xong */
  showVerifyMarks: true,

  /* 12 nhạc cụ
     family: "string" (dây) | "wind" (hơi) | "percussion" (gõ)
     branch: nhánh nhỏ theo cách phát ra tiếng; people: dân tộc gắn bó nhiều nhất
     genres: id loại hình liên quan (xem mục genres bên dưới) */
  instruments: [
    {
      id: "dan-bau",
      name: "Đàn bầu",
      gloss: { vi: "Đàn một dây", en: "Monochord" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/dan-bau.svg",
      audio: "audio/dan-bau.mp3",
      synth: ["dan-bau"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn bầu chỉ có một dây nhưng có thể “nói” như giọng người. Người chơi chạm nhẹ cạnh bàn tay vào dây để tạo bồi âm trong trẻo, tay kia uốn cần đàn làm cao độ lượn lên xuống mềm mại. Âm thanh ngân dài, man mác, rất hợp với những làn điệu trữ tình, nên đàn bầu thường được xem là nhạc cụ đặc trưng của Việt Nam.",
        en: "The đàn bầu has just one string, yet it can almost sing like a human voice. The player lightly touches the string with the edge of the hand to draw out clear harmonics, while the other hand bends a flexible rod to slide the pitch up and down. Its long, wistful tone makes it one of the most recognisable sounds of Vietnam."
      },
      material: {
        vi: "Thân đàn bằng gỗ hoặc ống tre, một dây kim loại, cần đàn uốn được (sừng, tre hoặc gỗ) và bầu cộng hưởng nhỏ. Tên đàn được cho là đến từ quả bầu khô từng dùng làm bầu cộng hưởng.",
        en: "A wooden or bamboo body, one metal string, a flexible rod (horn, bamboo or wood) and a small resonator. The name is said to come from the dried gourd (bầu) once used as that resonator."
      },
      play: {
        vi: "Tay phải cầm que gảy, cạnh bàn tay chạm vào các điểm nút trên dây để lấy bồi âm; tay trái đẩy, kéo cần đàn để đổi cao độ.",
        en: "The right hand plucks with a small stick while its edge touches nodes on the string for harmonics; the left hand pushes and pulls the rod to change pitch."
      }
    },
    {
      id: "dan-tranh",
      name: "Đàn tranh",
      gloss: { vi: "Đàn thập lục", en: "Zither" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/dan-tranh.svg",
      audio: "audio/dan-tranh.mp3",
      synth: ["dan-tranh"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn tranh có thân dài, mặt đàn hơi cong, nhiều dây căng trên những con nhạn có thể di chuyển. Tay phải đeo móng gảy để gảy dây, tay trái nhấn dây phía sau con nhạn để luyến, láy, tạo nét nhấn nhá rất riêng. Tiếng đàn trong sáng, lả lướt như nước chảy, thường được ví với tiếng suối reo.",
        en: "The đàn tranh is a long zither with a gently curved soundboard and many strings resting on movable bridges. The right hand plucks with finger picks while the left hand presses the strings behind the bridges to bend and ornament each note. The result is a bright, flowing sound, often compared to running water."
      },
      material: {
        vi: "Thân và mặt đàn bằng gỗ, dây kim loại. Đàn truyền thống có 16 dây nên còn gọi là đàn thập lục; ngày nay phổ biến loại 17 đến 22 dây.",
        en: "A wooden body and soundboard with metal strings. The traditional version has 16 strings (hence the name thập lục, “sixteen”); today 17 to 22 strings are common."
      },
      play: {
        vi: "Tay phải đeo móng gảy (thường ở ba ngón) để gảy; tay trái nhấn và rung dây ở phía sau con nhạn.",
        en: "The right hand plucks with picks (usually on three fingers); the left hand presses and vibrates the strings behind the bridges."
      }
    },
    {
      id: "dan-nguyet",
      name: "Đàn nguyệt",
      gloss: { vi: "Đàn kìm (Nam Bộ)", en: "Moon lute" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/dan-nguyet.svg",
      audio: "audio/dan-nguyet.mp3",
      synth: ["dan-nguyet"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn nguyệt có bầu đàn tròn như vầng trăng, cần đàn dài với các phím rất cao. Nhờ phím cao, người chơi có thể nhấn sâu để làm cao độ uốn lượn, tạo nên những nét nhạc mềm mại mà vẫn rộn ràng. Ở Nam Bộ, đàn được gọi là đàn kìm và giữ vai trò quan trọng trong đờn ca tài tử và cải lương.",
        en: "The đàn nguyệt has a round body like a full moon and a long neck with very high frets. Those tall frets let the player press deeply and bend notes, giving melodies that are supple yet lively. In southern Vietnam it is called đàn kìm, and it plays a leading role in đờn ca tài tử and cải lương."
      },
      material: {
        vi: "Bầu đàn tròn bằng gỗ, cần đàn dài gắn phím cao, 2 dây (xưa bằng tơ, nay thường bằng nylon).",
        en: "A round wooden body, a long neck with raised frets and 2 strings (silk in the past, usually nylon today)."
      },
      play: {
        vi: "Gảy bằng miếng gảy; tay trái bấm và nhấn sâu trên phím cao để luyến, láy.",
        en: "Plucked with a plectrum; the left hand presses deep on the high frets to slide and ornament."
      }
    },
    {
      id: "dan-nhi",
      name: "Đàn nhị",
      gloss: { vi: "Đàn cò (Nam Bộ)", en: "Two-string fiddle" },
      family: "string",
      branch: { vi: "Dây kéo bằng cung", en: "Bowed string" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "images/nhac-cu/dan-nhi.svg",
      audio: "audio/dan-nhi.mp3",
      synth: ["dan-nhi"],
      genres: ["tai-tu", "nha-nhac"],
      desc: {
        vi: "Đàn nhị là nhạc cụ kéo bằng cung, chỉ có hai dây nhưng diễn tả cảm xúc rất phong phú, từ tha thiết đến vui tươi. Lông cung được luồn giữa hai dây, người chơi đẩy kéo cung và rung ngón tay trái để tiếng đàn ngân nga. Đàn nhị có mặt trong chèo, cải lương và nhiều dàn nhạc dân gian.",
        en: "The đàn nhị is a bowed fiddle with only two strings, yet it expresses a wide range of feeling, from tender to cheerful. The bow hair passes between the two strings, and the player pushes and pulls it while vibrating the left-hand fingers. You will hear it in chèo theatre, cải lương and many folk ensembles."
      },
      material: {
        vi: "Bát đàn nhỏ bằng gỗ hoặc ống tre, bịt da trăn hoặc da rắn; cần đàn dài; cung tre căng lông đuôi ngựa.",
        en: "A small wooden or bamboo sound box covered with python or snake skin, a long neck, and a bamboo bow strung with horsehair."
      },
      play: {
        vi: "Kéo cung ở giữa hai dây; ngón tay trái bấm lơ lửng trên dây (đàn không có mặt phím) và rung để tạo độ ngân.",
        en: "Bow between the two strings; left-hand fingers press the strings in the air (there is no fingerboard) and vibrate them."
      }
    },
    {
      id: "ty-ba",
      name: "Tỳ bà",
      gloss: { vi: "Đàn hình quả lê", en: "Pear-shaped lute" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/ty-ba.svg",
      audio: "audio/ty-ba.mp3",
      synth: ["ty-ba"],
      genres: ["nha-nhac", "tai-tu"],
      desc: {
        vi: "Tỳ bà có thân hình quả lê, bốn dây và nhiều phím trải dài từ cần xuống mặt đàn. Ngón vê, tức gảy liên tục rất nhanh, giúp tiếng đàn rền như mưa rơi, còn những tiếng gảy dứt khoát lại sắc và sáng. Đây là nhạc cụ quen thuộc trong nhã nhạc cung đình Huế và những buổi ca Huế.",
        en: "The tỳ bà is a pear-shaped lute with four strings and frets running from the neck down onto the soundboard. A rapid tremolo technique called vê makes it shimmer like falling rain, while single plucks sound crisp and bright. It is a familiar voice in Huế royal court music and in ca Huế chamber singing."
      },
      material: {
        vi: "Thân gỗ hình quả lê, mặt đàn mỏng, 4 dây và nhiều phím.",
        en: "A pear-shaped wooden body with a thin soundboard, 4 strings and many frets."
      },
      play: {
        vi: "Gảy bằng móng tay hoặc miếng gảy; ngón vê tạo chuỗi tiếng rền liên tục.",
        en: "Plucked with the nails or a plectrum; the vê tremolo creates a continuous rolling sound."
      }
    },
    {
      id: "sao-truc",
      name: "Sáo trúc",
      gloss: { vi: "Sáo ngang", en: "Bamboo flute" },
      family: "wind",
      branch: { vi: "Hơi, thổi qua lỗ", en: "Wind, blown across a hole" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "images/nhac-cu/sao-truc.svg",
      audio: "audio/sao-truc.mp3",
      synth: ["sao-truc"],
      genres: ["tai-tu"],
      desc: {
        vi: "Sáo trúc là cây sáo ngang làm từ một ống trúc hoặc nứa, gắn liền với tuổi thơ nơi làng quê. Hơi thổi qua lỗ thổi, ngón tay đóng mở các lỗ bấm để đổi nốt, kết hợp luyến, láy, vỗ hơi cho tiếng sáo bay bổng. Âm sắc trong trẻo, khi vui tươi, khi da diết như tiếng gió trên đồng.",
        en: "The sáo trúc is a side-blown flute made from a single tube of bamboo, a sound closely tied to childhood in the Vietnamese countryside. Breath across the mouth hole and fingers opening and closing the holes change the notes, while slides and breath accents make the melody soar. Its clear tone can be playful or deeply nostalgic."
      },
      material: {
        vi: "Một ống trúc hoặc nứa, có 1 lỗ thổi và thường 6 lỗ bấm (có loại 10 lỗ).",
        en: "A single bamboo tube with one blowing hole and usually six finger holes (some have ten)."
      },
      play: {
        vi: "Cầm ngang, thổi vào lỗ thổi; ngón tay bịt và mở lỗ bấm, dùng hơi và lưỡi để láy.",
        en: "Held sideways and blown across the mouth hole; fingers cover and open the holes while breath and tongue add ornaments."
      }
    },
    {
      id: "khen",
      name: "Khèn",
      gloss: { vi: "Khèn bè, khèn Mông", en: "Bamboo mouth organ" },
      family: "wind",
      branch: { vi: "Hơi, lưỡi gà tự do", en: "Wind, free reed" },
      people: { vi: "Người H'Mông; người Thái, Mường có khèn bè", en: "H'Mông people; the Thái and Mường play the khèn bè" },
      image: "images/nhac-cu/khen.svg",
      audio: "audio/khen.mp3",
      synth: ["khen"],
      genres: [],
      desc: {
        vi: "Khèn là nhạc cụ hơi có lưỡi gà bằng đồng gắn trong các ống trúc, phổ biến ở vùng núi phía Bắc, nổi bật là khèn của người Mông. Người chơi vừa thổi vừa hút hơi nên tiếng khèn có thể vang liên tục, nhiều nốt cùng lúc. Khèn gắn với những buổi giao duyên, lễ hội và nghi lễ của cộng đồng.",
        en: "The khèn is a free-reed mouth organ with small brass reeds set inside bamboo pipes, common in the northern mountains, especially among the H'Mông people. Because players both blow and draw breath, the sound can continue without a break, with several notes ringing at once. It accompanies courtship, festivals and community rituals."
      },
      material: {
        vi: "Bầu hơi bằng gỗ, các ống trúc (khèn Mông thường có 6 ống) và lưỡi gà bằng đồng.",
        en: "A wooden wind chest, bamboo pipes (the H'Mông khèn usually has six) and brass free reeds."
      },
      play: {
        vi: "Thổi và hút hơi qua bầu; bịt lỗ trên ống để chọn nốt. Người Mông thường vừa thổi khèn vừa múa.",
        en: "Blow and draw air through the wind chest and cover holes on the pipes to choose notes. H'Mông players often dance while playing."
      }
    },
    {
      id: "ken-bau",
      name: "Kèn bầu",
      gloss: { vi: "Kèn dăm kép", en: "Vietnamese oboe" },
      family: "wind",
      branch: { vi: "Hơi, dăm kép", en: "Wind, double reed" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/ken-bau.svg",
      audio: "audio/ken-bau.mp3",
      synth: ["ken-bau"],
      genres: ["nha-nhac"],
      desc: {
        vi: "Kèn bầu là loại kèn dăm kép, loa kèn loe rộng như nửa quả bầu, cho âm thanh vang, khỏe và hơi rĩ. Kèn thường giữ giai điệu chính trong nhã nhạc cung đình, hát tuồng và các nghi lễ dân gian như lễ hội, đám tang. Người thổi có thể dùng kỹ thuật lấy hơi liên tục để câu nhạc không bị ngắt [CẦN KIỂM CHỨNG].",
        en: "The kèn bầu is a double-reed oboe whose flared bell resembles half a gourd, giving it a loud, bright, slightly buzzing tone. It often carries the main melody in Huế court music, tuồng theatre and folk rituals such as festivals and funerals. Players may use a continuous-breathing technique so phrases never break [CẦN KIỂM CHỨNG]."
      },
      material: {
        vi: "Thân gỗ có lỗ bấm, dăm kép và loa kèn bằng gỗ hoặc đồng.",
        en: "A wooden body with finger holes, a double reed and a bell made of wood or brass."
      },
      play: {
        vi: "Ngậm dăm kèn và thổi mạnh; ngón tay đóng mở lỗ bấm; môi điều khiển luyến, láy.",
        en: "Hold the reed in the mouth and blow firmly; fingers open and close the holes while the lips shape slides."
      }
    },
    {
      id: "trong",
      name: "Trống",
      gloss: { vi: "Trống cái, trống chầu, trống cơm…", en: "Drums" },
      family: "percussion",
      branch: { vi: "Gõ, màng rung (mặt da)", en: "Percussion, vibrating skin" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "images/nhac-cu/trong.svg",
      audio: "audio/trong.mp3",
      synth: ["trong"],
      genres: ["ca-tru", "hat-xoan", "bai-choi", "nha-nhac"],
      desc: {
        vi: "Trống là nhịp tim của âm nhạc truyền thống, có rất nhiều loại: trống cái trong lễ hội, trống chầu trong ca trù và hát tuồng, trống cơm được dán cơm nhão lên mặt da để chỉnh tiếng. Tiếng “tùng” đánh giữa mặt trống trầm vang, tiếng “cắc” gõ vào tang giòn gọn, đan xen thành nhịp điệu khi dồn dập, khi khoan thai.",
        en: "Drums are the heartbeat of traditional music, and there are many kinds: large festival drums, the trống chầu used to cheer singers in ca trù and tuồng, and the trống cơm, tuned with sticky rice paste pressed onto its skin. The deep “tùng” from the drumhead and the crisp “cắc” from the wooden rim weave rhythms both lively and calm."
      },
      material: {
        vi: "Tang trống bằng gỗ, mặt bịt da trâu, da bò hoặc da khác tùy loại.",
        en: "A wooden shell with heads of buffalo, cow or other hide depending on the type."
      },
      play: {
        vi: "Đánh bằng dùi hoặc bàn tay: đánh mặt trống cho tiếng “tùng”, gõ tang trống cho tiếng “cắc”.",
        en: "Struck with sticks or hands: the head gives “tùng”, the wooden rim gives “cắc”."
      }
    },
    {
      id: "phach",
      name: "Phách",
      gloss: { vi: "Nhạc cụ giữ nhịp", en: "Wooden clapper" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "images/nhac-cu/phach.svg",
      audio: "audio/phach.mp3",
      synth: ["phach"],
      genres: ["ca-tru", "hat-xoan", "tai-tu"],
      desc: {
        vi: "Phách là nhạc cụ gõ giữ nhịp, giản dị nhưng không thể thiếu. Trong ca trù, chính ca nương vừa hát vừa gõ phách bằng hai dùi lên một bàn phách tre hoặc gỗ, tạo nên những tiết tấu tinh tế, đối đáp với tiếng đàn đáy. Ở Nam Bộ, đờn ca tài tử dùng song lang, một kiểu phách gõ bằng chân.",
        en: "The phách is a simple but essential timekeeping instrument. In ca trù, the female singer herself strikes a small bamboo or wooden board with two beaters while she sings, creating delicate rhythms that answer the đàn đáy lute. In southern đờn ca tài tử, a foot-operated clapper called song lang keeps the beat."
      },
      material: {
        vi: "Bàn phách bằng tre hoặc gỗ cùng hai dùi gõ (ca trù); song lang bằng gỗ có quả gõ (Nam Bộ).",
        en: "A bamboo or wooden board with two beaters (ca trù); a wooden song lang with a striking ball (southern Vietnam)."
      },
      play: {
        vi: "Gõ dùi lên bàn phách theo các khổ phách; song lang được nhấn bằng chân.",
        en: "Beaters strike the board in set rhythmic patterns; the song lang is pressed with the foot."
      }
    },
    {
      id: "dan-trung",
      name: "Đàn t'rưng",
      gloss: { vi: "Đàn ống tre", en: "Bamboo xylophone" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Người Ba Na, Gia Rai (Tây Nguyên)", en: "Ba Na and Gia Rai peoples (Central Highlands)" },
      image: "images/nhac-cu/dan-trung.svg",
      audio: "audio/dan-trung.mp3",
      synth: ["dan-trung"],
      genres: ["cong-chieng"],
      desc: {
        vi: "Đàn t'rưng gồm nhiều ống tre, nứa dài ngắn khác nhau, xếp thành hàng trên giá hoặc treo lên dây, gắn bó với các dân tộc Tây Nguyên như Ba Na, Gia Rai. Mỗi ống cho một cao độ; khi gõ bằng dùi, tiếng đàn rộn ràng như tiếng suối, tiếng mưa rừng. Ngày nay đàn t'rưng thường có mặt trong các chương trình biểu diễn âm nhạc dân tộc.",
        en: "The đàn t'rưng is made of bamboo tubes of different lengths laid in a row or hung on cords, closely linked to Central Highlands peoples such as the Ba Na and Gia Rai. Each tube gives one pitch, and when struck with mallets the instrument ripples like streams and forest rain. Today it is a favourite in folk music performances."
      },
      material: {
        vi: "Các ống tre hoặc nứa được vát đầu, buộc vào dây hoặc đặt trên khung gỗ.",
        en: "Bamboo tubes cut at an angle, tied to cords or set on a wooden frame."
      },
      play: {
        vi: "Gõ bằng một hoặc hai dùi tre; ống dài cho tiếng trầm, ống ngắn cho tiếng cao.",
        en: "Struck with one or two bamboo mallets; long tubes sound low and short tubes sound high."
      }
    },
    {
      id: "cong-chieng",
      name: "Cồng chiêng",
      gloss: { vi: "Nhạc cụ đồng", en: "Bronze gongs" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Các dân tộc Tây Nguyên; người Mường cũng có cồng chiêng", en: "Peoples of the Central Highlands; the Mường also play gongs" },
      image: "images/nhac-cu/cong-chieng.svg",
      audio: "audio/cong-chieng.mp3",
      synth: ["cong-chieng"],
      genres: ["cong-chieng"],
      desc: {
        vi: "Cồng chiêng là những chiếc chiêng bằng đồng, mỗi chiếc giữ một cao độ riêng; khi cả dàn cùng đánh, các âm thanh đan cài thành bản nhạc hùng vĩ. Ở Tây Nguyên, cồng chiêng vang lên trong lễ mừng lúa mới, lễ bỏ mả, lễ đâm trâu, như tiếng nói nối con người với thần linh. Cồng có núm ở giữa, còn chiêng thì mặt phẳng.",
        en: "Cồng chiêng are bronze gongs, each tuned to its own pitch; when a whole ensemble plays, the sounds interlock into a powerful piece of music. In the Central Highlands they ring out at the new-rice festival, grave-leaving ceremonies and buffalo sacrifices, a voice linking people and spirits. Cồng have a raised boss in the centre, while chiêng are flat."
      },
      material: {
        vi: "Đồng hoặc hợp kim đồng, nhiều kích cỡ, mỗi chiếc một cao độ.",
        en: "Bronze or copper alloy, in many sizes, each with its own pitch."
      },
      play: {
        vi: "Mỗi người giữ một chiếc, đánh bằng dùi bọc vải hoặc bằng tay, phối hợp theo tiết tấu của cả dàn.",
        en: "Each player holds one gong and strikes it with a padded mallet or the hand, interlocking with the ensemble."
      }
    }
  ],

  /* 8 loại hình
     region: "north" | "central" | "highlands" | "south"
     lat/lon: tọa độ gần đúng để đặt điểm trên bản đồ SVG
     video: video chính thức trên kênh YouTube của UNESCO (mã video, trang di sản, ghi công).
     Loại hình KHÔNG có âm tổng hợp: máy không giả được giọng hát, nên chỉ dùng bản ghi thật (video UNESCO). */
  genres: [
    {
      id: "quan-ho",
      name: { vi: "Dân ca quan họ Bắc Ninh", en: "Quan họ Bắc Ninh folk songs" },
      short: "Quan họ",
      region: "north",
      place: { vi: "Vùng Kinh Bắc (Bắc Ninh, Bắc Giang)", en: "Kinh Bắc region (Bắc Ninh, Bắc Giang)" },
      lat: 21.18, lon: 106.07,
      unesco: {
        year: 2009,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/quan-ho.svg",
      video: { youtube: "MlKtqU5685w", unesco: "https://ich.unesco.org/en/RL/00183", credit: "© 2008 Vietnam Institute of Culture and Arts Studies" },
      instruments: [],
      desc: {
        vi: "Quan họ là lối hát đối đáp giữa các liền anh và liền chị, thường không cần nhạc đệm. Người hát dùng kỹ thuật “vang, rền, nền, nảy” để câu hát ngọt ngào, tình tứ. Quan họ gắn với tục kết chạ giữa các làng và những hội xuân vùng Kinh Bắc, nơi người ta có thể hát canh thâu đêm.",
        en: "Quan họ is antiphonal singing between groups of men (liền anh) and women (liền chị), usually without instruments. Singers use the techniques known as “vang, rền, nền, nảy” to make each phrase sweet and tender. It is tied to friendship pacts between villages and to spring festivals in the Kinh Bắc region, where singing sessions can last all night."
      }
    },
    {
      id: "ca-tru",
      name: { vi: "Ca trù", en: "Ca trù" },
      short: "Ca trù",
      region: "north",
      place: { vi: "Miền Bắc (Hà Nội và nhiều tỉnh phía Bắc)", en: "Northern Vietnam (Hà Nội and many northern provinces)" },
      lat: 21.03, lon: 105.85,
      unesco: {
        year: 2009,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp", en: "List of Intangible Cultural Heritage in Need of Urgent Safeguarding" }
      },
      image: "images/loai-hinh/ca-tru.svg",
      video: { youtube: "XrzGeo8GQX8", unesco: "https://ich.unesco.org/en/USL/00309", credit: "© 2008 Vietnamese Institute for Musicology" },
      instruments: ["phach", "trong"],
      desc: {
        vi: "Ca trù là nghệ thuật hát thơ tinh tế, từng thịnh hành ở đình làng và dinh thự. Một buổi ca trù có ca nương vừa hát vừa gõ phách, kép đàn chơi đàn đáy và quan viên đánh trống chầu để khen chê. Giọng hát ca trù nén, ngân, nhả chữ tròn trịa, đòi hỏi nhiều năm luyện tập công phu.",
        en: "Ca trù is a refined art of sung poetry once popular at village communal houses and in private residences. A performance brings together a female singer who also plays the phách clapper, a musician on the đàn đáy lute, and a connoisseur who beats the trống chầu drum to praise or critique. Its controlled, ringing vocal style takes years to master."
      }
    },
    {
      id: "hat-xoan",
      name: { vi: "Hát xoan Phú Thọ", en: "Xoan singing of Phú Thọ" },
      short: "Hát xoan",
      region: "north",
      place: { vi: "Phú Thọ", en: "Phú Thọ" },
      lat: 21.32, lon: 105.40,
      unesco: {
        year: 2011,
        note: { vi: "Danh sách cần bảo vệ khẩn cấp; năm 2017 được chuyển sang Danh sách đại diện", en: "Urgent Safeguarding List; moved to the Representative List in 2017" }
      },
      image: "images/loai-hinh/hat-xoan.svg",
      video: { youtube: "Vair7eo_NHE", unesco: "https://ich.unesco.org/en/RL/01260", credit: "© 2016 Phú Thọ Department of Culture, Sports and Tourism" },
      instruments: ["trong", "phach"],
      desc: {
        vi: "Hát xoan là lối hát thờ cúng Vua Hùng, thường diễn ra vào mùa xuân tại các miếu, đình ở Phú Thọ. Mỗi phường xoan có trùm phường, đào và kép; buổi hát đi từ những bài nghi lễ trang nghiêm đến những màn hát hội vui tươi. Nhạc đệm chỉ có trống và phách, để giọng hát và điệu múa nổi bật.",
        en: "Hát xoan is ritual singing in honour of the Hùng Kings, performed in spring at shrines and communal houses in Phú Thọ. Each xoan guild has a leader, female singers and male performers, and a performance moves from solemn ceremonial songs to lively festival songs. Only a drum and a clapper accompany, letting the voices and dance shine."
      }
    },
    {
      id: "nha-nhac",
      name: { vi: "Nhã nhạc cung đình Huế", en: "Nhã nhạc, Huế royal court music" },
      short: "Nhã nhạc",
      region: "central",
      place: { vi: "Huế", en: "Huế" },
      lat: 16.46, lon: 107.59,
      unesco: {
        year: 2003,
        note: { vi: "Công nhận là Kiệt tác năm 2003; ghi danh vào Danh sách đại diện năm 2008", en: "Proclaimed a Masterpiece in 2003; inscribed on the Representative List in 2008" }
      },
      image: "images/loai-hinh/nha-nhac.svg",
      video: { youtube: "G5X7KUtbEkk", unesco: "https://ich.unesco.org/en/RL/00074", credit: "© UNESCO" },
      instruments: ["ken-bau", "ty-ba", "dan-nhi", "trong"],
      desc: {
        vi: "Nhã nhạc là âm nhạc cung đình, vang lên trong các đại lễ, lễ tế và yến tiệc của triều đình. Dưới triều Nguyễn (1802–1945), nhã nhạc phát triển đầy đủ nhất với dàn đại nhạc hoành tráng và dàn tiểu nhạc thanh nhã. Năm 2003, UNESCO công nhận nhã nhạc là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại.",
        en: "Nhã nhạc is royal court music, performed at grand ceremonies, rituals and banquets. Under the Nguyễn dynasty (1802–1945) it reached its fullest form, with a powerful great ensemble (đại nhạc) and a refined small ensemble (tiểu nhạc). In 2003 UNESCO proclaimed it a Masterpiece of the Oral and Intangible Heritage of Humanity."
      }
    },
    {
      id: "vi-giam",
      name: { vi: "Dân ca ví, giặm Nghệ Tĩnh", en: "Ví and giặm folk songs of Nghệ Tĩnh" },
      short: "Ví, giặm",
      region: "central",
      place: { vi: "Nghệ An, Hà Tĩnh", en: "Nghệ An and Hà Tĩnh" },
      lat: 18.68, lon: 105.68,
      unesco: {
        year: 2014,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/vi-giam.svg",
      video: { youtube: "LAjFaHHYxXc", unesco: "https://ich.unesco.org/en/RL/01008", credit: "© 2013 Vietnam Institute of Culture and Arts Studies" },
      instruments: [],
      desc: {
        vi: "Ví và giặm là hai lối hát dân ca của người Nghệ An, Hà Tĩnh, nảy sinh ngay trong lúc cấy cày, chèo thuyền, dệt vải. Ví thường ngân dài, tự do, giàu cảm xúc; giặm có nhịp rõ ràng, lời kể chuyện hoặc khuyên răn. Lời ca mộc mạc, đậm giọng địa phương, chứa đựng tình yêu quê hương và nghĩa tình con người.",
        en: "Ví and giặm are folk singing styles of Nghệ An and Hà Tĩnh, born while people planted rice, rowed boats or wove cloth. Ví is free-flowing and long-held, full of emotion; giặm has a clear beat and lyrics that tell stories or give advice. Sung in the local dialect, they carry a deep love for homeland and community."
      }
    },
    {
      id: "bai-choi",
      name: { vi: "Nghệ thuật Bài chòi Trung Bộ", en: "Art of Bài chòi in Central Vietnam" },
      short: "Bài chòi",
      region: "central",
      place: { vi: "Các tỉnh Trung Bộ", en: "Provinces of Central Vietnam" },
      lat: 14.10, lon: 109.05,
      unesco: {
        year: 2017,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/bai-choi.svg",
      video: { youtube: "mcILpWU81GU", unesco: "https://ich.unesco.org/en/RL/01222", credit: "© 2015 Vietnamese Institute for Musicology" },
      instruments: ["trong"],
      desc: {
        vi: "Bài chòi là trò chơi dân gian kết hợp âm nhạc, thơ ca và diễn xướng, thường tổ chức vào dịp Tết. Người chơi ngồi trong các chòi tre, còn anh hiệu rút thẻ và hát những câu thai để báo con bài. Ai có đủ thẻ trùng sẽ thắng. Tiếng hát hòa cùng tiếng trống, tiếng đàn khiến hội bài chòi vui như ngày hội làng.",
        en: "Bài chòi is a folk game that blends music, poetry and performance, usually held around Tết. Players sit in small bamboo huts (chòi) while the caller, anh hiệu, draws cards and sings verses that hint at each card. Whoever collects a matching set wins. With singing, drums and strings, a bài chòi gathering feels like a village festival."
      }
    },
    {
      id: "cong-chieng",
      name: { vi: "Không gian văn hóa Cồng chiêng Tây Nguyên", en: "Space of Gong Culture in the Central Highlands" },
      short: "Cồng chiêng",
      region: "highlands",
      place: {
        vi: "Năm tỉnh Tây Nguyên: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (theo địa giới khi được ghi danh)",
        en: "Five Central Highlands provinces: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (boundaries at the time of inscription)"
      },
      lat: 12.90, lon: 108.05,
      unesco: {
        year: 2005,
        note: { vi: "Công nhận là Kiệt tác năm 2005; ghi danh vào Danh sách đại diện năm 2008", en: "Proclaimed a Masterpiece in 2005; inscribed on the Representative List in 2008" }
      },
      image: "images/loai-hinh/cong-chieng.svg",
      video: { youtube: "l90_bPVujKc", unesco: "https://ich.unesco.org/en/RL/00120", credit: "© UNESCO" },
      instruments: ["cong-chieng", "dan-trung"],
      desc: {
        vi: "Với các dân tộc Tây Nguyên, cồng chiêng không chỉ là nhạc cụ mà là tiếng nói thiêng liêng nối con người với thần linh. Cồng chiêng vang lên trong mọi dịp quan trọng của đời người và buôn làng, từ lễ mừng lúa mới đến lễ cầu mưa. Không gian văn hóa ấy gồm cả người chơi, nhạc cụ, lễ hội, nhà rông và núi rừng.",
        en: "For the peoples of the Central Highlands, gongs are more than instruments: they are a sacred voice linking people with the spirits. They sound at every important moment in a person's life and in village life, from the new-rice festival to rain-prayer rites. This cultural space includes the players, the gongs, the festivals, the communal houses and the forest itself."
      }
    },
    {
      id: "tai-tu",
      name: { vi: "Đờn ca tài tử Nam Bộ", en: "Đờn ca tài tử of southern Vietnam" },
      short: "Đờn ca tài tử",
      region: "south",
      place: { vi: "Các tỉnh Nam Bộ", en: "Provinces of southern Vietnam" },
      lat: 10.03, lon: 105.78,
      unesco: {
        year: 2013,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/tai-tu.svg",
      video: { youtube: "5M4h4AGteGU", unesco: "https://ich.unesco.org/en/RL/00733", credit: "© 2011 Vietnamese Institute for Musicology" },
      instruments: ["dan-nguyet", "dan-tranh", "dan-nhi", "dan-bau", "sao-truc", "phach"],
      desc: {
        vi: "Đờn ca tài tử hình thành ở Nam Bộ vào cuối thế kỷ 19, là lối chơi nhạc thân mật của những người “tài tử” yêu nghệ thuật. Họ quây quần trong sân nhà, trên ghe thuyền hay trong ngày đám tiệc, cùng đờn, cùng ca và ngẫu hứng quanh những bài bản quen thuộc. Từ đờn ca tài tử, nghệ thuật cải lương đã ra đời.",
        en: "Đờn ca tài tử emerged in southern Vietnam in the late 19th century as intimate music made by amateur “tài tử” enthusiasts. They gather in courtyards, on boats or at family celebrations, playing and singing together and improvising around well-known pieces. This tradition gave birth to cải lương, the southern reformed theatre."
      }
    }
  ],

  /* 8 mốc lịch sử
     Mỗi mốc: period (khoảng thời gian), title, summary (40–70 từ),
     facts: các sự kiện có năm cụ thể (chỉ ghi điều đã đối chiếu được nguồn),
     debate: điều còn tranh luận (nói rõ, không giấu), sources: nguồn tra cứu,
     genres / instruments: mục liên quan để nghe, xem; image + alt: cảnh minh họa (hình vẽ mới, không phải tư liệu). */
  history: [
    {
      id: "dong-son",
      short: { vi: "Đàn đá, trống đồng", en: "Stone and bronze" }, // tên ngắn trên thanh thời kỳ
      start: -700,
      period: { vi: "Thời tiền sử – thế kỷ 1", en: "Prehistory – 1st century CE" },
      title: { vi: "Đàn đá và trống đồng", en: "Stone lithophones and bronze drums" },
      summary: {
        vi: "Những nhạc cụ cổ nhất tìm thấy trên đất Việt Nam làm bằng đá và đồng. Đàn đá là những phiến đá được ghè đẽo để mỗi thanh gõ ra một cao độ riêng. Trống đồng của văn hóa Đông Sơn (khoảng thế kỷ 7 TCN đến thế kỷ 1) vừa là nhạc cụ vừa là vật dùng trong nghi lễ; mặt trống khắc người đánh trống, nhảy múa, chim bay và thuyền.",
        en: "The oldest instruments found in Vietnam are made of stone and bronze. Lithophones are stone slabs chipped so that each one rings at its own pitch. The bronze drums of the Đông Sơn culture (around the 7th century BCE to the 1st century CE) were both instruments and ritual objects; their surfaces show people drumming and dancing, birds in flight and boats."
      },
      facts: [
        { year: "1893", vi: "Trống đồng Ngọc Lũ được tìm thấy khi đắp đê ở làng Ngọc Lũ (Hà Nam). Trống hiện trưng bày tại Bảo tàng Lịch sử Quốc gia ở Hà Nội.",
          en: "The Ngọc Lũ drum was found while villagers were building a dyke in Ngọc Lũ (Hà Nam). It is now on display at the National Museum of Vietnamese History in Hà Nội." },
        { year: "1949", vi: "Công nhân làm đường ở Ndut Liêng Krak (Đắk Lắk) đào được một bộ đàn đá 11 thanh. Nhà dân tộc học Georges Condominas đưa bộ đàn về Paris để nghiên cứu.",
          en: "Road workers at Ndut Liêng Krak (Đắk Lắk) dug up a set of 11 stone bars. The ethnologist Georges Condominas took the set to Paris for study." },
        { year: "2012", vi: "Trống đồng Ngọc Lũ đứng đầu danh sách 30 hiện vật được công nhận Bảo vật quốc gia đợt đầu tiên.",
          en: "The Ngọc Lũ drum heads the list of the first 30 objects recognised as National Treasures of Vietnam." }
      ],
      debate: {
        vi: "Tuổi của bộ đàn đá Ndut Liêng Krak còn tranh luận: có tài liệu nói 3.000 đến 5.000 năm, có nghiên cứu cho rằng muộn hơn. Mốc bắt đầu của văn hóa Đông Sơn cũng có nhiều cách xác định khác nhau.",
        en: "The age of the Ndut Liêng Krak lithophone is still debated: some sources say 3,000 to 5,000 years, while other studies place it later. Scholars also date the start of the Đông Sơn culture in different ways."
      },
      sources: [
        { vi: "Bảo tàng Lịch sử Quốc gia: Bảo vật quốc gia trống đồng Ngọc Lũ", en: "National Museum of Vietnamese History: the Ngọc Lũ drum",
          url: "https://baotanglichsu.vn/en/Articles/1004/73640/national-treasures-the-ngoc-lu-drum.html" },
        { vi: "G. Condominas, bài về đàn đá Ndut Liêng Krak, Bulletin de l'École française d'Extrême-Orient", en: "G. Condominas, article on the Ndut Liêng Krak lithophone, Bulletin de l'École française d'Extrême-Orient" }
      ],
      genres: [], instruments: [],
      image: "images/lich-su/dong-son.svg",
      alt: { vi: "Tranh khắc gỗ: mặt trống đồng có ngôi sao giữa và vòng chim bay, bên cạnh là bộ đàn đá trên giá.",
             en: "Woodcut-style picture: a bronze drumhead with a central star and a ring of flying birds, next to a stone lithophone on a stand." }
    },
    {
      id: "ly-tran",
      short: { vi: "Lý – Trần", en: "Lý and Trần" }, // tên ngắn trên thanh thời kỳ
      start: 1009,
      period: { vi: "1009 – 1400", en: "1009 – 1400" },
      title: { vi: "Thời Lý – Trần: rối nước và trò diễn", en: "Lý and Trần: water puppets and staged shows" },
      summary: {
        vi: "Dưới hai triều Lý (1009–1225) và Trần (1225–1400), âm nhạc gắn với chùa chiền, cung đình và hội hè. Văn bia và sử sách cho thấy triều đình đã có những buổi diễn lớn: múa rối trên mặt nước có trống nhạc, rồi các trò diễn có vai và phục trang. Đây là những ghi chép sớm nhất còn lại về sân khấu ở nước ta.",
        en: "Under the Lý (1009–1225) and Trần (1225–1400) dynasties, music belonged to temples, the royal court and village festivals. Stone inscriptions and chronicles describe large court performances: puppets dancing on water to drums and music, and later staged shows with roles and costumes. These are the earliest surviving records of theatre in Vietnam."
      },
      facts: [
        { year: "1121", vi: "Bia Sùng Thiện Diên Linh được dựng ở chùa Long Đọi Sơn (Hà Nam). Văn bia tả cảnh múa rối trên mặt nước trong buổi lễ mừng thọ vua Lý Nhân Tông. Tấm bia nay là Bảo vật quốc gia.",
          en: "The Sùng Thiện Diên Linh stele was erected at Long Đọi Sơn pagoda (Hà Nam). Its text describes puppets performing on water at a celebration of King Lý Nhân Tông's longevity. The stele is now a National Treasure." },
        { year: "1285", vi: "Trong cuộc kháng chiến chống quân Nguyên, quân Trần bắt được Lý Nguyên Cát, một người trong phường hát, nổi tiếng hát giỏi.",
          en: "During the war against the Yuan armies, Trần forces captured Lý Nguyên Cát, a member of a troupe of singers known for his fine voice." },
        { year: "1362", vi: "Đại Việt sử ký toàn thư, chép ở năm này, kể lại rằng con em nhà quyền quý theo Lý Nguyên Cát học hát và diễn những tích truyện có vai.",
          en: "The Đại Việt sử ký toàn thư chronicle, in its entry for this year, recalls that children of noble families learned singing and acted stories with roles from Lý Nguyên Cát." }
      ],
      debate: {
        vi: "Nhiều sách coi chuyện Lý Nguyên Cát là một mốc của nghệ thuật tuồng, nhưng cũng có nhà nghiên cứu cho rằng tuồng hình thành từ nhiều nguồn trong nước, không chỉ từ một người.",
        en: "Many books treat the Lý Nguyên Cát story as a milestone for tuồng theatre, but some researchers argue that tuồng grew from many local sources, not from one person."
      },
      sources: [
        { vi: "Đại Việt sử ký toàn thư, Bản kỷ, năm Nhâm Dần (1362)", en: "Đại Việt sử ký toàn thư (Complete Annals of Đại Việt), entry for 1362" },
        { vi: "Nhà hát Múa rối Việt Nam: lịch sử múa rối nước", en: "Vietnam Puppetry Theatre: history of water puppetry",
          url: "https://nhahatmuaroivietnam.vn/node/998" }
      ],
      genres: [], instruments: [],
      image: "images/lich-su/ly-tran.svg",
      alt: { vi: "Tranh khắc gỗ: thủy đình mái cong giữa ao, những con rối múa trên mặt nước, có người đánh trống bên bờ.",
             en: "Woodcut-style picture: a water pavilion with a curved roof in a pond, puppets dancing on the water and a drummer on the bank." }
    },
    {
      id: "le",
      short: { vi: "Thời Lê", en: "The Lê era" }, // tên ngắn trên thanh thời kỳ
      start: 1428,
      period: { vi: "1428 – 1789", en: "1428 – 1789" },
      title: { vi: "Thời Lê: định lễ nhạc, hát cửa đình", en: "The Lê era: court ritual music and village singing" },
      summary: {
        vi: "Sau khi giành lại độc lập, nhà Lê sắp xếp lại lễ nhạc của triều đình theo tinh thần Nho giáo, có nhạc khí và bài bản riêng cho từng nghi lễ. Ở làng xã, đình làng là nơi hát xướng trong ngày hội. Lối hát ở cửa đình, cửa đền này về sau được gọi chung là ca trù, với ba thành phần: đào nương gõ phách, kép đàn đáy và người cầm chầu.",
        en: "After regaining independence, the Lê dynasty reorganised court ritual music along Confucian lines, with its own instruments and pieces for each ceremony. In the villages, the communal house was where people sang at festivals. This singing at communal houses and temples later became known as ca trù, performed by a female singer with clappers, a lute player and a drummer who judges the song."
      },
      facts: [
        { year: "1437", vi: "Theo Đại Việt sử ký toàn thư, vua Lê Thái Tông giao Nguyễn Trãi và Lương Đăng lo việc nhạc khí và dạy nhạc múa cho triều đình. Nguyễn Trãi dâng bản vẽ khánh đá; thợ đá Giáp Sơn lấy đá núi Kính Chủ để làm khánh.",
          en: "According to the Đại Việt sử ký toàn thư, King Lê Thái Tông put Nguyễn Trãi and Lương Đăng in charge of court instruments and the teaching of music and dance. Nguyễn Trãi presented drawings for stone chimes, which stonemasons from Giáp Sơn made from Kính Chủ mountain stone." },
        { year: "Thế kỷ 17 – 19", yearEn: "17th – 19th c.", vi: "Nhiều văn bia ở đình làng ghi lại khế ước mua bán quyền hát cửa đình, cho thấy lối hát này đã là một nghề có tổ chức.",
          en: "Many inscriptions at village communal houses record contracts for buying and selling the right to sing there, showing that this singing had become an organised profession." },
        { year: "2009", vi: "UNESCO ghi danh ca trù vào Danh sách di sản văn hóa phi vật thể cần bảo vệ khẩn cấp.",
          en: "UNESCO inscribed ca trù on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding." }
      ],
      debate: {
        vi: "Ca trù có từ bao giờ vẫn chưa thống nhất. Có nơi kể truyền thuyết từ thế kỷ 15, có nhà nghiên cứu dẫn một bài văn của Lê Đức Mao (thế kỷ 15) làm bằng chứng; còn các văn bia về hát cửa đình thì có từ thế kỷ 17.",
        en: "When ca trù began is still not settled. Some villages tell legends from the 15th century, and some researchers cite a text by Lê Đức Mao (15th century) as evidence; the inscriptions about singing at communal houses date from the 17th century."
      },
      sources: [
        { vi: "Đại Việt sử ký toàn thư, năm Thiệu Bình thứ 4 (1437)", en: "Đại Việt sử ký toàn thư, entry for 1437" },
        { vi: "UNESCO: Ca trù singing", en: "UNESCO: Ca trù singing", url: "https://ich.unesco.org/en/USL/ca-tru-singing-00309" },
        { vi: "Vietnam Social Sciences: Gìn giữ ca trù qua các thời kỳ", en: "Vietnam Social Sciences: Grassroots preservation of ca trù singing",
          url: "https://vjol.info.vn/VSS/en/article/view/88612" }
      ],
      genres: ["ca-tru"], instruments: ["phach"],
      image: "images/lich-su/le.svg",
      alt: { vi: "Tranh khắc gỗ: chiếc khánh đá treo trên giá gỗ trước sân đình, một đào nương ngồi gõ phách.",
             en: "Woodcut-style picture: a stone chime hanging on a wooden frame in front of a communal house, with a singer playing clappers." }
    },
    {
      id: "nguyen",
      short: { vi: "Triều Nguyễn", en: "The Nguyễn court" }, // tên ngắn trên thanh thời kỳ
      start: 1802,
      period: { vi: "1802 – 1945", en: "1802 – 1945" },
      title: { vi: "Triều Nguyễn: nhã nhạc ở Huế", en: "The Nguyễn court: nhã nhạc in Huế" },
      summary: {
        vi: "Nhà Nguyễn đóng đô ở Huế và quy định nhạc cho từng nghi lễ: lễ tế Nam Giao, lễ Đại triều, Thường triều, sinh nhật vua và hoàng hậu, yến tiệc trong cung. Có dàn lớn với kèn, trống, chiêng và dàn nhỏ với đàn, sáo. Cùng thời, ca Huế phát triển trong sinh hoạt của quan lại và người dân bên sông Hương.",
        en: "The Nguyễn dynasty ruled from Huế and set out music for each ceremony: the Nam Giao sacrifice, grand and regular court audiences, the birthdays of the king and queen, and palace banquets. There were large ensembles with oboes, drums and gongs, and small ones with strings and flutes. Meanwhile ca Huế chamber singing grew among officials and townspeople along the Hương River."
      },
      facts: [
        { year: "1802", vi: "Vua Gia Long lên ngôi, Huế trở thành kinh đô của cả nước cho đến năm 1945.",
          en: "Gia Long took the throne and Huế became the capital of the whole country until 1945." },
        { year: "1826", vi: "Duyệt Thị Đường, nhà hát trong Tử Cấm Thành, được xây dưới thời vua Minh Mạng để vua và hoàng tộc xem tuồng, nghe nhạc.",
          en: "Duyệt Thị Đường, the theatre inside the Tử Cấm Thành (the royal residence in the citadel), was built under King Minh Mạng for the royal family to watch tuồng and hear music." },
        { year: "1945", vi: "Vua Bảo Đại thoái vị. Nhã nhạc mất chỗ dựa là triều đình, nhạc công tản mát và nhiều bài bản dần thất truyền.",
          en: "King Bảo Đại abdicated. Nhã nhạc lost its patron, the court; musicians dispersed and many pieces were gradually lost." },
        { year: "2003", vi: "UNESCO công nhận Nhã nhạc cung đình Huế là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại (đưa vào Danh sách đại diện năm 2008).",
          en: "UNESCO proclaimed Nhã nhạc, Vietnamese court music, a Masterpiece of the Oral and Intangible Heritage of Humanity (incorporated into the Representative List in 2008)." }
      ],
      debate: {
        vi: "Không phải dàn nhạc nào cũng còn đến nay. Nghiên cứu của Phan Thuận Thảo cho biết cuối thời Nguyễn, có dàn đã thất truyền, có dàn đổi cấu trúc; nhã nhạc hôm nay là kết quả của nhiều năm phục dựng.",
        en: "Not every ensemble survived. Research by Phan Thuận Thảo shows that by the end of the Nguyễn era some ensembles had been lost and others had changed; the nhã nhạc heard today is the result of years of reconstruction."
      },
      sources: [
        { vi: "UNESCO: Nhã nhạc, Vietnamese court music", en: "UNESCO: Nhã nhạc, Vietnamese court music",
          url: "https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074" },
        { vi: "Phan Thuận Thảo, Tạp chí Nghiên cứu và Phát triển (Huế)", en: "Phan Thuận Thảo, Research and Development journal (Huế)",
          url: "https://vjol.info.vn/ncpt-hue/article/view/4570" }
      ],
      genres: ["nha-nhac"], instruments: ["ken-bau", "trong"],
      image: "images/lich-su/nguyen.svg",
      alt: { vi: "Tranh khắc gỗ: cổng cung điện mái vàng nhiều tầng, phía trước là các nhạc công mặc áo đỏ thổi kèn, đánh trống.",
             en: "Woodcut-style picture: a multi-roofed palace gate with yellow tiles, with musicians in red robes playing oboes and drums in front." }
    },
    {
      id: "tai-tu-cai-luong",
      short: { vi: "Tài tử, cải lương", en: "Tài tử, cải lương" }, // tên ngắn trên thanh thời kỳ
      start: 1880,
      period: { vi: "Cuối thế kỷ 19 – thập niên 1930", en: "Late 19th century – 1930s" },
      title: { vi: "Đờn ca tài tử và cải lương", en: "Đờn ca tài tử and cải lương" },
      summary: {
        vi: "Ở Nam Bộ cuối thế kỷ 19, những người chơi nhạc không chuyên, gọi là tài tử, cùng nhau đờn và ca quanh các bài bản quen thuộc, trong đó có 20 bài được gọi là bài tổ. Đầu thế kỷ 20, lối ca có điệu bộ (ca ra bộ) dần lên sân khấu, có tích truyện, phục trang và cảnh trí. Từ đó hình thành sân khấu cải lương.",
        en: "In southern Vietnam in the late 19th century, amateur musicians called tài tử gathered to play and sing around well-known pieces, including 20 core pieces known as the bài tổ. In the early 20th century, singing with acted gestures (ca ra bộ) moved onto the stage, with stories, costumes and scenery. This became cải lương theatre."
      },
      facts: [
        { year: "1918", vi: "Vở Kim Vân Kiều diễn ở Mỹ Tho thường được lấy làm mốc ra đời của cải lương. Năm 2018, giới sân khấu cả nước kỷ niệm 100 năm sân khấu cải lương.",
          en: "A staging of Kim Vân Kiều in Mỹ Tho is usually taken as the birth of cải lương. In 2018, theatres across Vietnam celebrated 100 years of cải lương." },
        { year: "1919", vi: "Nhạc sĩ Cao Văn Lầu (Sáu Lầu) ở Bạc Liêu viết bài Dạ cổ hoài lang. Bài này về sau phát triển thành bản vọng cổ, bài quan trọng bậc nhất của cải lương.",
          en: "Composer Cao Văn Lầu (Sáu Lầu) of Bạc Liêu wrote Dạ cổ hoài lang. It later grew into vọng cổ, the most important melody in cải lương." },
        { year: "2013", vi: "UNESCO ghi danh Nghệ thuật đờn ca tài tử Nam Bộ vào Danh sách di sản văn hóa phi vật thể đại diện của nhân loại.",
          en: "UNESCO inscribed the art of Đờn ca tài tử music and song in southern Vietnam on the Representative List." }
      ],
      debate: {
        vi: "Mốc 1918 chưa được mọi người đồng ý: có nhà nghiên cứu đề nghị năm 1917, với vở Vì nghĩa quên nhà ở Sa Đéc. Năm sáng tác Dạ cổ hoài lang cũng có tài liệu ghi 1917, 1918 hoặc 1920, nhưng nhiều nguồn thống nhất là 1919.",
        en: "Not everyone accepts 1918: one researcher proposes 1917, with the play Vì nghĩa quên nhà in Sa Đéc. Some sources also date Dạ cổ hoài lang to 1917, 1918 or 1920, though most agree on 1919."
      },
      sources: [
        { vi: "UNESCO: Đờn ca tài tử", en: "UNESCO: Art of Đờn ca tài tử music and song",
          url: "https://ich.unesco.org/en/RL/art-of-don-ca-tai-tu-music-and-song-in-south-viet-nam-00733" },
        { vi: "Tạp chí Nghiên cứu và Phát triển: Một trăm năm cải lương là năm nào?", en: "Research and Development journal: Which year marks 100 years of cải lương?",
          url: "https://vjol.info.vn/ncpt-hue/article/view/38427" }
      ],
      genres: ["tai-tu"], instruments: ["dan-nguyet", "dan-tranh"],
      image: "images/lich-su/tai-tu-cai-luong.svg",
      alt: { vi: "Tranh khắc gỗ: sân khấu cải lương có màn đỏ, hai nghệ sĩ đang diễn, phía dưới là dàn đờn ngồi bên cạnh.",
             en: "Woodcut-style picture: a cải lương stage with a red curtain and two actors performing, with musicians seated at the side." }
    },
    {
      id: "hien-dai",
      short: { vi: "Trường lớp, sân khấu", en: "Schools and stages" }, // tên ngắn trên thanh thời kỳ
      start: 1956,
      period: { vi: "Từ năm 1956", en: "From 1956" },
      title: { vi: "Vào trường lớp, lên sân khấu lớn", en: "Into the classroom and onto the concert stage" },
      summary: {
        vi: "Năm 1956, Trường Âm nhạc Việt Nam được thành lập ở Hà Nội; cùng năm, Sài Gòn cũng mở trường âm nhạc quốc gia. Nhạc cụ dân tộc bắt đầu được dạy theo giáo trình, có lớp học và kỳ thi. Nhiều nhạc cụ được cải tiến để độc tấu và hòa tấu trên sân khấu lớn, ví dụ đàn bầu gắn bộ thu âm điện. Các nhà nghiên cứu đi khắp nơi sưu tầm, ghi âm dân ca.",
        en: "In 1956, the Vietnam School of Music opened in Hà Nội, and a national music school opened in Sài Gòn the same year. Traditional instruments began to be taught with set curricula, classes and exams. Many instruments were adapted for solo and ensemble playing on large stages; the đàn bầu, for example, gained an electric pickup. Researchers travelled widely to collect and record folk songs."
      },
      facts: [
        { year: "1956", vi: "Trường Âm nhạc Việt Nam ra đời (26/11/1956), nay là Học viện Âm nhạc Quốc gia Việt Nam. Trường ở Sài Gòn mở cùng năm nay là Nhạc viện Thành phố Hồ Chí Minh.",
          en: "The Vietnam School of Music was founded on 26 November 1956; it is now the Vietnam National Academy of Music. The Sài Gòn school founded that year is now the Hồ Chí Minh City Conservatory." },
        { year: "1962", vi: "Giáo sư Trần Văn Khê (1921–2015) xuất bản ở Paris cuốn sách tiếng Pháp về âm nhạc truyền thống Việt Nam, giới thiệu âm nhạc Việt với giới nghiên cứu thế giới.",
          en: "Professor Trần Văn Khê (1921–2015) published a French-language book on traditional Vietnamese music in Paris, introducing it to scholars around the world." },
        { year: "1981", vi: "Trần Văn Khê nhận Giải thưởng Âm nhạc của UNESCO và Hội đồng Âm nhạc Quốc tế.",
          en: "Trần Văn Khê received the UNESCO–International Music Council Music Prize." }
      ],
      debate: {
        vi: "Việc cải tiến nhạc cụ (thêm dây, gắn bộ thu âm điện, chỉnh lại thang âm) giúp hòa tấu dễ hơn, nhưng cũng có ý kiến lo rằng làm vậy mất đi âm sắc và lối chơi cũ.",
        en: "Adapting instruments (adding strings, fitting pickups, retuning scales) made ensemble playing easier, but some musicians worry that it loses the old sound and playing style."
      },
      sources: [
        { vi: "Báo Giáo dục và Thời đại: Học viện Âm nhạc Quốc gia Việt Nam, 70 năm", en: "Giáo dục và Thời đại: 70 years of the Vietnam National Academy of Music",
          url: "https://giaoduc.net.vn/hoc-vien-am-nhac-quoc-gia-viet-nam-70-nam-vun-dap-gia-tri-am-nhac-viet-post263226.gd" },
        { vi: "Trần Văn Khê, La musique vietnamienne traditionnelle, Paris, 1962", en: "Trần Văn Khê, La musique vietnamienne traditionnelle, Paris, 1962" }
      ],
      genres: [], instruments: ["dan-bau", "dan-tranh"],
      image: "images/lich-su/hien-dai.svg",
      alt: { vi: "Tranh khắc gỗ: lớp học nhạc, thầy giáo và học trò ngồi chơi đàn bầu, đàn tranh, trên bảng có khuông nhạc.",
             en: "Woodcut-style picture: a music class with a teacher and students playing the đàn bầu and đàn tranh, a stave drawn on the board." }
    },
    {
      id: "unesco",
      short: { vi: "UNESCO", en: "UNESCO" }, // tên ngắn trên thanh thời kỳ
      start: 2003,
      period: { vi: "2003 – nay", en: "2003 – present" },
      title: { vi: "Các mốc UNESCO", en: "UNESCO milestones" },
      summary: {
        vi: "Từ năm 2003, nhiều loại hình âm nhạc Việt Nam lần lượt được UNESCO ghi danh. Ghi danh không phải là phần thưởng cuối cùng: mỗi hồ sơ đi kèm cam kết của cộng đồng và nhà nước về việc truyền dạy, và định kỳ phải báo cáo kết quả. Hát xoan là ví dụ: từ danh sách khẩn cấp năm 2011, đến năm 2017 đã đủ điều kiện chuyển sang danh sách đại diện.",
        en: "Since 2003, UNESCO has inscribed one Vietnamese musical tradition after another. Inscription is not a final prize: every nomination comes with commitments from communities and the state to keep teaching the art, with regular reports. Hát xoan shows how this works: placed on the urgent list in 2011, it was moved to the Representative List in 2017."
      },
      facts: [
        { year: "2003", vi: "Nhã nhạc cung đình Huế (Kiệt tác; Danh sách đại diện năm 2008).", en: "Nhã nhạc, Huế court music (Masterpiece; Representative List in 2008)." },
        { year: "2005", vi: "Không gian văn hóa cồng chiêng Tây Nguyên (Kiệt tác; Danh sách đại diện năm 2008).", en: "Space of gong culture in the Central Highlands (Masterpiece; Representative List in 2008)." },
        { year: "2009", vi: "Dân ca quan họ Bắc Ninh (đại diện) và ca trù (cần bảo vệ khẩn cấp).", en: "Quan họ Bắc Ninh folk songs (Representative) and ca trù singing (Urgent Safeguarding)." },
        { year: "2011", vi: "Hát xoan Phú Thọ (cần bảo vệ khẩn cấp; chuyển sang đại diện năm 2017).", en: "Xoan singing of Phú Thọ (Urgent Safeguarding; moved to Representative in 2017)." },
        { year: "2013", vi: "Nghệ thuật đờn ca tài tử Nam Bộ.", en: "Art of Đờn ca tài tử music and song in southern Vietnam." },
        { year: "2014", vi: "Dân ca ví, giặm Nghệ Tĩnh.", en: "Ví and Giặm folk songs of Nghệ Tĩnh." },
        { year: "2016", vi: "Thực hành tín ngưỡng thờ Mẫu Tam phủ, trong đó có hát văn.", en: "Practices related to the Việt beliefs in the Mother Goddesses of Three Realms, which include hát văn singing." },
        { year: "2017", vi: "Nghệ thuật bài chòi Trung Bộ.", en: "Art of Bài chòi in Central Vietnam." },
        { year: "2019", vi: "Thực hành Then của người Tày, Nùng, Thái.", en: "Practices of Then by Tày, Nùng and Thái ethnic groups." }
      ],
      sources: [
        { vi: "UNESCO: Di sản văn hóa phi vật thể của Việt Nam", en: "UNESCO: Intangible Cultural Heritage of Viet Nam",
          url: "https://ich.unesco.org/en/state/viet-nam-VN" }
      ],
      genres: ["nha-nhac", "cong-chieng", "quan-ho", "ca-tru", "hat-xoan", "tai-tu", "vi-giam", "bai-choi"], instruments: [],
      image: "images/lich-su/unesco.svg",
      alt: { vi: "Tranh khắc gỗ: tám vật gợi tám loại hình (chiêng, nón quai thao, phách, quạt, kèn, đàn kìm, nón lá, thẻ bài chòi) xếp quanh một tấm bằng đóng dấu đỏ.",
             en: "Woodcut-style picture: eight objects standing for eight genres (gong, flat hat, clappers, fan, oboe, moon lute, conical hat, bài chòi card) around a certificate with a red seal." }
    },
    {
      id: "hom-nay",
      short: { vi: "Hôm nay", en: "Today" }, // tên ngắn trên thanh thời kỳ
      start: 2020,
      period: { vi: "Hôm nay", en: "Today" },
      title: { vi: "Âm nhạc truyền thống hôm nay", en: "Traditional music today" },
      summary: {
        vi: "Ngày nay, âm nhạc truyền thống vẫn sống ở các câu lạc bộ, lễ hội làng, nhà hát và trường học. Nhiều nghệ nhân cao tuổi đang mở lớp truyền nghề cho lớp trẻ, và nhà nước phong danh hiệu cho những người giữ di sản. Bên cạnh đó, có nghệ sĩ trẻ đưa đàn bầu, đàn tranh vào nhạc pop, jazz hay nhạc điện tử để nhiều người biết đến hơn.",
        en: "Today, traditional music still lives in clubs, village festivals, theatres and schools. Many elderly masters run classes for young learners, and the state gives honorary titles to people who keep the heritage alive. Some young artists also bring the đàn bầu and đàn tranh into pop, jazz or electronic music, so that more people come to know them."
      },
      facts: [
        { year: "2015", vi: "Lần đầu tiên nhà nước xét tặng danh hiệu Nghệ nhân ưu tú trong lĩnh vực di sản văn hóa phi vật thể, theo Nghị định 62/2014.",
          en: "For the first time, the state awarded the title Meritorious Artisan for intangible cultural heritage, under Decree 62/2014." },
        { year: "2019", vi: "Đợt xét tặng thứ hai có thêm danh hiệu Nghệ nhân nhân dân, dành cho những người đã là Nghệ nhân ưu tú.",
          en: "The second round added the title People's Artisan, given to people who already held the Meritorious title." }
      ],
      sources: [
        { vi: "Nghị định 62/2014/NĐ-CP về xét tặng danh hiệu Nghệ nhân nhân dân, Nghệ nhân ưu tú", en: "Decree 62/2014/NĐ-CP on the titles People's Artisan and Meritorious Artisan" }
      ],
      genres: [], instruments: ["dan-bau"],
      image: "images/lich-su/hom-nay.svg",
      alt: { vi: "Tranh khắc gỗ: một nghệ nhân lớn tuổi dạy một bạn trẻ chơi đàn bầu, bên cạnh là chiếc loa và điện thoại.",
             en: "Woodcut-style picture: an elderly master teaching a young person to play the đàn bầu, with a speaker and a phone beside them." }
    }
  ],

  /* Thuật ngữ: bấm vào chữ có gạch chấm trong bài để xem giải thích (common.js, ASV.Glossary).
     match: các cách viết sẽ được nhận ra trong bài (không phân biệt hoa thường; bản EN tự bỏ dấu).
     Chỉ ghi định nghĩa chắc chắn; thêm từ mới thì thêm cả vi và en. */
  glossary: [
    { id: "am-thuc", term: { vi: "Âm thực", en: "Open string (âm thực)" },
      match: { vi: ["âm thực"], en: ["open string", "open strings", "âm thực"] },
      def: { vi: "Tiếng của dây đàn khi gảy mà tay không chạm vào điểm nút nào, còn gọi là tiếng dây buông. Trên đàn bầu, âm thực thấp hơn và ít trong hơn âm bồi.",
             en: "The sound of a string plucked without touching any node, also called the open string. On the đàn bầu it is lower and less bell-like than a harmonic." } },
    { id: "am-boi", term: { vi: "Âm bồi", en: "Harmonic (âm bồi)" },
      match: { vi: ["âm bồi", "bồi âm"], en: ["harmonic", "harmonics", "âm bồi"] },
      def: { vi: "Tiếng trong và cao, có được khi cạnh bàn tay chạm nhẹ vào một điểm nút trên dây đúng lúc gảy. Chạm ở giữa dây (1/2) được âm cao gấp đôi âm thực, chạm ở 1/3 dây được âm cao gấp ba.",
             en: "A clear, high tone made by lightly touching a node on the string with the edge of the hand while plucking. Touching at the middle (1/2) gives twice the frequency of the open string, at 1/3 gives three times." } },
    { id: "diem-nut", term: { vi: "Điểm nút", en: "Node" },
      match: { vi: ["điểm nút"], en: ["node", "nodes"] },
      def: { vi: "Điểm chia dây thành các phần bằng nhau (1/2, 1/3, 1/4…). Chạm nhẹ vào đó thì dây không rung cả chiều dài mà rung thành nhiều đoạn ngắn, cho ra âm bồi.",
             en: "A point that divides the string into equal parts (1/2, 1/3, 1/4…). Touch it lightly and the string vibrates in several short sections instead of its full length, giving a harmonic." } },
    { id: "can-dan", term: { vi: "Cần đàn (đàn bầu)", en: "Rod (cần đàn)" },
      match: { vi: ["cần đàn"], en: ["the rod", "cần đàn"] },
      def: { vi: "Thanh dẻo cắm ở một đầu đàn bầu, đầu dây buộc vào đó. Đẩy cần đàn làm dây chùng, tiếng thấp xuống; kéo ngược lại làm dây căng, tiếng cao lên.",
             en: "The flexible rod at one end of the đàn bầu, where the string is tied. Bending it one way slackens the string and lowers the pitch; bending it the other way tightens the string and raises it." } },
    { id: "ve", term: { vi: "Vê", en: "Tremolo (vê)" },
      match: { vi: ["vê"], en: ["tremolo"] },
      def: { vi: "Gảy liên tục thật nhanh vào một dây để tiếng đàn nghe như ngân dài không dứt. Đàn tỳ bà, đàn nguyệt và đàn tranh hay dùng cách chơi này.",
             en: "Plucking one string again and again very fast so the note seems to sustain. Common on the tỳ bà, đàn nguyệt and đàn tranh." } },
    { id: "luyen", term: { vi: "Luyến", en: "Glide (luyến)" },
      match: { vi: ["luyến"], en: ["glide", "glides"] },
      def: { vi: "Đi từ nốt này sang nốt khác liền một hơi hoặc một đường cung, không ngắt tiếng ở giữa.",
             en: "Moving from one note to the next in one breath or one bow stroke, without a break in the sound." } },
    { id: "con-nhan", term: { vi: "Con nhạn", en: "Bridge (con nhạn)" },
      match: { vi: ["con nhạn"], en: ["bridges", "con nhạn"] },
      def: { vi: "Miếng gỗ nhỏ kê dưới mỗi dây đàn tranh. Xê dịch con nhạn là đổi cao độ của dây đó.",
             en: "A small wooden piece under each string of the đàn tranh. Moving it changes the pitch of that string." } },
    { id: "luoi-ga", term: { vi: "Lưỡi gà", en: "Free reed (lưỡi gà)" },
      match: { vi: ["lưỡi gà"], en: ["free reed"] },
      def: { vi: "Lá kim loại rất mỏng gắn trong ống. Hơi thổi vào hay hút ra đều làm lá rung và phát ra tiếng. Khèn của người Mông dùng lưỡi gà bằng đồng.",
             en: "A very thin metal tongue fixed inside a pipe. Blowing in or drawing breath out both make it vibrate and sound. The Mông khèn uses brass free reeds." } },
    { id: "dam-kep", term: { vi: "Dăm kép", en: "Double reed (dăm kép)" },
      match: { vi: ["dăm kép", "dăm kèn"], en: ["double reed"] },
      def: { vi: "Hai lá mỏng ép sát nhau ở đầu kèn. Thổi mạnh làm hai lá rung đập vào nhau, cho tiếng kèn vang và khỏe. Kèn bầu là kèn dăm kép.",
             en: "Two thin blades pressed together at the top of the instrument. Blowing hard makes them vibrate against each other, giving a loud, strong sound. The kèn bầu is a double-reed instrument." } },
    { id: "tri-am", term: { vi: "Ống trì âm", en: "Drone pipe" },
      match: { vi: ["ống trì âm"], en: ["drone pipe"] },
      def: { vi: "Ống giữ một nốt vang suốt khi chơi, làm nền cho giai điệu (âm trì tục). Ở phần chơi thử, khèn luôn có ống trì âm nốt Rê vang cùng.",
             en: "A pipe that holds one note throughout, under the melody. In the playing section, the khèn always sounds its D drone pipe along with the other pipes." } },
    { id: "tang-trong", term: { vi: "Tang trống", en: "Drum body (tang trống)" },
      match: { vi: ["tang trống"], en: ["wooden rim", "tang trống"] },
      def: { vi: "Phần thân bằng gỗ của trống, bao quanh mặt da. Gõ vào tang ra tiếng “cắc” khô, gõ vào mặt da ra tiếng “tùng”.",
             en: "The wooden body of the drum around the skin. Striking it gives a dry “cắc”, striking the skin gives a deep “tùng”." } },
    { id: "song-lang", term: { vi: "Song lang", en: "Song lang" },
      match: { vi: ["song lang"], en: ["song lang"] },
      def: { vi: "Nhạc cụ gõ nhỏ bằng gỗ, người đờn gõ bằng chân để giữ nhịp trong đờn ca tài tử và cải lương.",
             en: "A small wooden percussion instrument that a musician strikes with the foot to keep time in đờn ca tài tử and cải lương." } },
    { id: "ngu-cung", term: { vi: "Ngũ cung (thang năm âm)", en: "Pentatonic scale" },
      match: { vi: ["ngũ cung", "năm cung", "thang năm âm"], en: ["pentatonic", "five-note scale"] },
      def: { vi: "Thang âm có năm nốt trong một quãng tám. Nhiều làn điệu dân ca Việt Nam dựa trên thang năm âm. Có thể nghe so sánh ở phần “Năm âm và bảy âm” của trang Nhạc cụ.",
             en: "A scale with five notes in an octave. Many Vietnamese folk melodies are built on it. You can compare it by ear in the “Five notes and seven notes” section of the Instruments page." } },
    { id: "ca-nuong", term: { vi: "Ca nương (đào nương)", en: "Ca nương" },
      match: { vi: ["ca nương", "đào nương"], en: ["ca nương", "đào nương"] },
      def: { vi: "Người nữ hát trong ca trù, vừa hát vừa gõ phách. Cùng biểu diễn có kép đàn chơi đàn đáy và quan viên đánh trống chầu.",
             en: "The female singer in ca trù, who sings while striking the phách. She performs with a đàn đáy lute player and a listener who beats the praise drum." } },
    { id: "cam-chau", term: { vi: "Cầm chầu", en: "Cầm chầu" },
      match: { vi: ["cầm chầu"], en: ["cầm chầu"] },
      def: { vi: "Đánh trống chầu khi nghe ca trù. Tiếng trống vừa giữ nhịp vừa để khen hay chê câu hát, nên người cầm chầu phải là người am hiểu.",
             en: "Beating the praise drum while listening to ca trù. The drum keeps time and also praises or criticises the singing, so the drummer must be a knowledgeable listener." } },
    { id: "hat-cua-dinh", term: { vi: "Hát cửa đình", en: "Hát cửa đình" },
      match: { vi: ["hát cửa đình"], en: ["hát cửa đình"] },
      def: { vi: "Hát ca trù ở đình làng trong dịp lễ hội để thờ thần. Văn bia từ thế kỷ 17 còn ghi lại việc mua bán quyền hát cửa đình.",
             en: "Ca trù singing at the village communal house during festivals, as an offering to the village deity. Inscriptions from the 17th century record the buying and selling of this right to sing." } },
    { id: "lien-anh", term: { vi: "Liền anh, liền chị", en: "Liền anh, liền chị" },
      match: { vi: ["liền anh", "liền chị"], en: ["liền anh", "liền chị"] },
      def: { vi: "Cách gọi những người nam và nữ hát quan họ. Họ hát đối đáp theo từng cặp giữa các nhóm của những làng kết nghĩa với nhau.",
             en: "The names for the men and women who sing quan họ. They answer each other in pairs, between groups from villages bound by a traditional friendship." } },
    { id: "ca-ra-bo", term: { vi: "Ca ra bộ", en: "Ca ra bộ" },
      match: { vi: ["ca ra bộ"], en: ["ca ra bộ"] },
      def: { vi: "Lối vừa ca vừa làm điệu bộ diễn tả nội dung bài, xuất hiện ở Nam Bộ đầu thế kỷ 20. Đây là bước chuyển từ đờn ca tài tử sang sân khấu cải lương.",
             en: "Singing with acted gestures that show the meaning of the song, which appeared in southern Vietnam in the early 20th century. It was the step from đờn ca tài tử to cải lương theatre." } },
    { id: "bai-to", term: { vi: "Bài tổ", en: "Bài tổ" },
      match: { vi: ["bài tổ"], en: ["bài tổ"] },
      def: { vi: "20 bài bản gốc của đờn ca tài tử, chia thành bốn nhóm: 6 bài Bắc, 3 bài Nam, 4 bài Oán và 7 bài lớn.",
             en: "The 20 core pieces of đờn ca tài tử, in four groups: 6 Bắc pieces, 3 Nam pieces, 4 Oán pieces and the 7 great pieces." } },
    { id: "vong-co", term: { vi: "Vọng cổ", en: "Vọng cổ" },
      match: { vi: ["vọng cổ"], en: ["vọng cổ"] },
      def: { vi: "Bài bản phát triển từ bài Dạ cổ hoài lang của Cao Văn Lầu (nhiều nguồn ghi năm 1919), về sau là bài quan trọng bậc nhất của cải lương.",
             en: "A melody that grew out of Cao Văn Lầu's Dạ cổ hoài lang (dated 1919 by most sources) and became the most important piece in cải lương." } },
    { id: "kiet-tac", term: { vi: "Kiệt tác (UNESCO)", en: "Masterpiece (UNESCO)" },
      match: { vi: ["kiệt tác"], en: ["masterpiece"] },
      def: { vi: "Danh hiệu “Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại” UNESCO công bố trong các năm 2001, 2003 và 2005. Năm 2008 các kiệt tác được đưa vào Danh sách đại diện.",
             en: "The title “Masterpiece of the Oral and Intangible Heritage of Humanity”, proclaimed by UNESCO in 2001, 2003 and 2005. In 2008 the Masterpieces were incorporated into the Representative List." } },
    { id: "ds-dai-dien", term: { vi: "Danh sách đại diện", en: "Representative List" },
      match: { vi: ["danh sách đại diện", "danh sách di sản văn hóa phi vật thể đại diện"], en: ["representative list"] },
      def: { vi: "Danh sách di sản văn hóa phi vật thể đại diện của nhân loại, lập theo Công ước năm 2003 của UNESCO về bảo vệ di sản văn hóa phi vật thể.",
             en: "The Representative List of the Intangible Cultural Heritage of Humanity, set up under UNESCO's 2003 Convention for the Safeguarding of the Intangible Cultural Heritage." } },
    { id: "ds-khan-cap", term: { vi: "Danh sách cần bảo vệ khẩn cấp", en: "Urgent Safeguarding List" },
      match: { vi: ["cần bảo vệ khẩn cấp"], en: ["urgent safeguarding"] },
      def: { vi: "Danh sách của UNESCO dành cho di sản đang có nguy cơ mai một, cần kế hoạch bảo vệ ngay. Ca trù vào danh sách này năm 2009, hát xoan năm 2011.",
             en: "UNESCO's list for heritage at risk of disappearing that needs safeguarding plans now. Ca trù was placed on it in 2009 and hát xoan in 2011." } }
  ]
};
