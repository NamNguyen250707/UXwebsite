/* core.js: phần code dùng chung cho mọi trang của Âm Sắc Việt.
   Gồm 4 phần, theo đúng thứ tự phải chạy (phần sau dùng biến của phần trước):
     PHẦN 1  Bản dịch VI/EN và hàm đổi ngôn ngữ ....... I18n, ASV_TRANSLATIONS
     PHẦN 2  Dữ liệu nhạc cụ, loại hình, lịch sử ...... ASV_DATA
     PHẦN 3  Đường biên Việt Nam cho bản đồ ............ ASV_MAP
     PHẦN 4  Menu, chân trang, âm thanh, tiện ích ...... ASV
   Mỗi trang nạp file này, rồi nạp file riêng của trang (home.js, genres.js…).
   Muốn tìm nhanh một phần: tìm chữ "PHẦN 1", "PHẦN 2"… */


/* ======================================================================
   PHẦN 1: BẢN DỊCH VI/EN VÀ HÀM ĐỔI NGÔN NGỮ (I18n)
   ====================================================================== */

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
    "nav.glossary": "Thuật ngữ",
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
    "player.synth": "Âm tổng hợp minh họa",
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
    "video.sourceTheatre": "Video: kênh YouTube chính thức của {channel}",
    "video.sourcePress": "Video: phóng sự của {channel}",
    "photo.credit": "Ảnh: {author} · {source} · {license}",
    "photo.unknown": "không rõ tác giả",
    "photo.pd": "Phạm vi công cộng",
    "video.watchAria": "Xem video {name} ngay trong trang",
    "video.openAria": "Mở video {name} trên YouTube (tab mới)",

    /* Mô tả các trang (dùng cho thẻ và "Xem tiếp") */
    "page.home.title": "Trang chủ",
    "page.home.desc": "Xem biểu diễn của ba miền và gảy thử cây đàn bầu.",
    "page.genres.title": "Loại hình",
    "page.genres.desc": "16 loại hình trên bản đồ: 10 được UNESCO ghi danh, 6 loại hình tiêu biểu khác như chèo, tuồng, cải lương.",
    "page.instruments.title": "Nhạc cụ",
    "page.instruments.desc": "12 nhạc cụ chia theo dây, hơi, gõ, kèm một cây đàn bầu ảo để bạn tự chơi.",
    "page.history.title": "Lịch sử",
    "page.history.desc": "8 mốc lịch sử, mỗi mốc có năm tháng, nguồn tra cứu và những chỗ còn tranh luận.",
    "page.glossary.title": "Thuật ngữ",
    "page.glossary.desc": "23 từ chuyên môn giải thích bằng lời thường, kèm âm thanh, link chơi thử và video.",
    "next.title": "Xem tiếp",

    /* Footer */
    "footer.explore": "Các trang",
    "footer.about": "Nguồn tư liệu",
    "footer.aboutText": "Đồ án môn Tương tác người – máy (HCI/UX). Nội dung phục vụ mục đích học tập.",
    "footer.synthNote": "Tiếng nhạc cụ trong phần nghe và chơi thử là âm mô phỏng bằng Web Audio, không phải bản thu nhạc cụ thật.",
    "footer.motif": "Biểu tượng đàn bầu, hình nhạc cụ và họa tiết nền được vẽ mới cho trang này theo lối tranh khắc gỗ, không sao chép hiện vật hay tác phẩm cụ thể nào.",
    "footer.videoNote": "Video lấy từ kênh YouTube của UNESCO, các nhà hát và báo chí nhà nước. Ảnh lấy từ Wikimedia Commons và Báo Điện tử Chính phủ; tác giả và giấy phép ghi dưới mỗi ảnh.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Lên đầu trang",

    /* Trang Loại hình */
    "genres.meta.title": "Loại hình âm nhạc | Âm Sắc Việt",
    "genres.meta.desc": "Bản đồ 16 loại hình âm nhạc truyền thống Việt Nam, 10 được UNESCO ghi danh, kèm ảnh, mô tả và video biểu diễn.",
    "genres.title": "Các loại hình âm nhạc",
    "genres.lead": "16 loại hình: 10 được UNESCO ghi danh, 6 loại hình tiêu biểu khác.",
    "genres.live": "Đang xem: {name}",
    "hist.meta.title": "Lịch sử âm nhạc truyền thống | Âm Sắc Việt",
    "hist.meta.desc": "Tám mốc lịch sử của âm nhạc truyền thống Việt Nam, từ đàn đá, trống đồng đến hôm nay, có năm tháng, nguồn tra cứu và những điểm còn tranh luận.",
    "hist.title": "Lịch sử âm nhạc truyền thống",
    "hist.nav.label": "Chọn thời kỳ",
    "hist.facts": "Sự kiện có năm cụ thể",
    "hist.debate": "Còn tranh luận",
    "hist.sources": "Nguồn tra cứu ({n})",
    "hist.listen": "Nghe, xem và chơi thử",
    "hist.rec": "Bản ghi {name}",
    "hist.read": "Đọc về {name}",
    "hist.try": "Chơi thử {name}",
    "hist.synthNote": "Tiếng nhạc cụ là âm mô phỏng. Video là bản ghi thật, nguồn ghi dưới mỗi video.",
    "hist.live": "Đang xem: {title}",
    "hist.method.title": "Chúng tôi viết trang này như thế nào",
    "hist.method.text": "Năm tháng được đối chiếu với sử liệu (Đại Việt sử ký toàn thư), Bảo tàng Lịch sử Quốc gia, hồ sơ UNESCO và các bài nghiên cứu đã đăng tạp chí. Điều gì chỉ có trong truyền thuyết hoặc các nguồn còn nói khác nhau thì đưa vào mục “Còn tranh luận”, không viết như sự thật đã chắc chắn. Tám mốc này chỉ là những điểm nổi bật; lịch sử âm nhạc của 54 dân tộc Việt Nam còn rộng hơn nhiều.",
    "media.altHistory": "Hình minh họa: {name}",
    "genres.filter.label": "Lọc theo vùng",
    "genres.filter.all": "Tất cả",
    "genres.filter.short": "Vùng",
    "genres.group.short": "Nhóm",
    "genres.group.label": "Lọc theo nhóm",
    "genres.group.unesco": "UNESCO ghi danh",
    "genres.group.other": "Loại hình khác",
    "genres.legend.unesco": "Được UNESCO ghi danh",
    "genres.legend.other": "Loại hình tiêu biểu khác",
    "genres.badge.national": "Di sản quốc gia {year}",
    "genres.badge.nationalNoYear": "Di sản quốc gia",
    "genres.badge.none": "Loại hình truyền thống",
    "genres.noVideo": "Chưa có video được phép dùng cho loại hình này.",
    "genres.count": "Đang hiện {n} loại hình",
    "genres.empty": "Không có loại hình nào thuộc cả vùng và nhóm đang chọn.",
    "genres.map.aria": "Bản đồ Việt Nam đánh dấu nơi lưu giữ 16 loại hình",
    "genres.map.sea": "Biển Đông",
    "genres.map.hoangSa": "Quần đảo Hoàng Sa",
    "genres.map.truongSa": "Quần đảo Trường Sa",
    "genres.map.source": "Đường biên: Natural Earth. Chấm nhỏ ở cuối đường nối là vị trí thật.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Nơi lưu giữ",
    "genres.panel.list": "Công nhận",
    "genres.panel.instruments": "Nhạc cụ thường dùng",
    "genres.panel.noInstruments": "Chủ yếu là giọng hát, thường không cần nhạc đệm.",
    "genres.panel.media": "Xem biểu diễn",
    "genres.panel.prev": "Loại hình trước",
    "genres.panel.next": "Loại hình sau",
    "genres.list.title": "Tất cả loại hình",

    /* Trang Nhạc cụ */
    "inst.meta.title": "Nhạc cụ | Âm Sắc Việt",
    "inst.meta.desc": "12 nhạc cụ truyền thống Việt Nam chia theo dây, hơi, gõ, có hình, mô tả, âm thanh và một cây đàn bầu ảo để tự chơi.",
    "inst.title": "Nhạc cụ truyền thống",
    "inst.filter.label": "Lọc theo họ nhạc cụ",
    "inst.filter.all": "Tất cả",
    "inst.hint.all": "Nhạc cụ được chia theo cách phát ra tiếng: dây, hơi và gõ.",
    "inst.hint.string": "Dây: tiếng phát ra từ dây căng, được gảy bằng tay, que, móng hoặc kéo bằng cung.",
    "inst.hint.wind": "Hơi: tiếng phát ra từ luồng hơi thổi qua lỗ, qua lưỡi gà hoặc qua dăm kèn.",
    "inst.hint.percussion": "Gõ: tiếng phát ra khi gõ vào mặt da căng (trống) hoặc vào chính thân nhạc cụ (phách, chiêng, ống tre).",
    "inst.search.label": "Tìm theo tên",
    "inst.search.placeholder": "Ví dụ: đàn bầu, dan bau, khèn",
    "inst.count": "Đang hiện {n} nhạc cụ",
    "inst.empty.title": "Không tìm thấy nhạc cụ nào",
    "inst.empty.text": "Không có nhạc cụ nào khớp với “{q}” trong nhóm đang chọn.",
    "inst.empty.reset": "Xóa tìm kiếm và bộ lọc",
    "inst.modal.close": "Đóng",
    "inst.modal.branch": "Nhánh",
    "inst.modal.people": "Dân tộc",
    "inst.modal.material": "Chất liệu",
    "inst.modal.play": "Cách chơi",
    "inst.modal.genres": "Có trong loại hình",
    "inst.modal.noGenres": "Không có trong các loại hình ở trang Loại hình.",
    "inst.modal.prev": "Nhạc cụ trước",
    "inst.modal.next": "Nhạc cụ sau",
    "inst.bau.title": "Đàn bầu ảo",
    "inst.play.title": "Chơi thử nhạc cụ",
    "inst.play.disclaimer": "Đây là âm mô phỏng bằng máy tính, nghe gần giống chứ không thay được nhạc cụ thật. Muốn nghe nghệ nhân chơi, hãy xem video ở trang Loại hình.",
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
    "gloss.all": "Xem trong trang Thuật ngữ",
    "gloss.close": "Đóng",
    "gloss.here": "Đến mục từ này",
    "glossary.meta.title": "Thuật ngữ | Âm Sắc Việt",
    "glossary.meta.desc": "23 từ chuyên môn về âm nhạc truyền thống Việt Nam, giải thích bằng lời thường, kèm âm thanh, link chơi thử và video biểu diễn.",
    "glossary.title": "Thuật ngữ",
    "glossary.lead": "23 từ chuyên môn dùng trong các trang khác, nơi chúng có gạch chấm bên dưới.",
    "glossary.filter.label": "Lọc theo nhóm",
    "glossary.filter.all": "Tất cả",
    "glossary.group.sound": "Cách chơi và âm thanh",
    "glossary.group.parts": "Nhạc cụ và bộ phận",
    "glossary.group.performance": "Biểu diễn và bài bản",
    "glossary.group.unesco": "Danh hiệu UNESCO",
    "glossary.search.label": "Tìm từ",
    "glossary.search.placeholder": "Ví dụ: âm bồi, am boi, vê",
    "glossary.count": "{n} từ",
    "glossary.count1": "1 từ",
    "glossary.empty.title": "Không có từ nào khớp",
    "glossary.empty.text": "Không có từ nào khớp với “{q}” trong nhóm đang chọn.",
    "glossary.empty.reset": "Xóa tìm kiếm và bộ lọc",
    "glossary.sound.am-thuc": "âm thực",
    "glossary.sound.am-boi": "âm bồi",
    "glossary.sound.am-thuc.title": "Âm thực đàn bầu (âm mô phỏng)",
    "glossary.sound.am-boi.title": "Âm bồi đàn bầu 2, 3, 4 (âm mô phỏng)",
    "glossary.watch": "Xem {name} biểu diễn",
    "glossary.scales": "Nghe năm âm và bảy âm",
    "glossary.related": "Liên quan:",
    "glossary.history": "Lịch sử: {name}",
    "glossary.unescoList": "Các loại hình UNESCO ghi danh",
    "scale.title": "Năm âm và bảy âm",
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
    "rec.heading": "Ghi lại phần bạn chơi",
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
    "home.meta.desc": "Âm nhạc truyền thống Việt Nam: 16 loại hình có video biểu diễn, 12 nhạc cụ chơi thử được, 8 mốc lịch sử có nguồn.",
    "home.hero.title": "Nghe nhạc truyền thống của ba miền",
    "home.hero.lead": "Từ tiếng trống đồng Đông Sơn đến những làn điệu được UNESCO ghi danh: 16 loại hình, 12 nhạc cụ và tám mốc lịch sử của âm nhạc truyền thống Việt Nam.",
    "home.hero.cta": "Bắt đầu khám phá",
    "home.hero.cta2": "Chơi thử đàn bầu",
    "home.screen.north": "Bắc Bộ",
    "home.screen.northSub": "Quan họ Bắc Ninh",
    "home.screen.badge": "Xem biểu diễn",
    "home.screen.rec": "Xem biểu diễn: {name}",
    "home.screen.recExternal": "Xem biểu diễn: {name} (mở YouTube ở tab mới)",
    "rec.close": "Đóng",
    "rec.title": "{name}: video biểu diễn",
    "home.screen.northAlt": "Liền anh, liền chị hát quan họ giao duyên dưới rạp hội Lim, Bắc Ninh, người xem đứng quanh.",
    "home.screen.central": "Trung Bộ",
    "home.screen.centralSub": "Nhã nhạc cung đình Huế",
    "home.screen.centralAlt": "Nhạc công nhã nhạc mặc áo đỏ viền vàng đánh trống, thổi kèn trong một buổi diễn ở Festival Huế 2008.",
    "home.screen.south": "Nam Bộ",
    "home.screen.southSub": "Đờn ca tài tử",
    "home.screen.southAlt": "Ảnh năm 1911: một ban đờn ca tài tử ở Sài Gòn ngồi cùng đàn tranh, đàn kìm, đàn cò, đàn tỳ bà.",
    "home.bau.label": "Cây đàn bầu. Bấm vào dây đàn ở các vị trí khác nhau để nghe; với bàn phím, nhấn Enter để gảy lần lượt.",
    "home.bau.hint": "Chạm vào dây đàn để nghe. Chạm gần trục lên dây ra âm bồi trong và cao; chạm gần cần đàn ra âm thực (dây buông).",
    "home.bau.open": "Âm thực (dây buông)",
    "home.bau.harmonic": "Bồi âm thứ {n}",
    "home.bau.title": "Đàn bầu, bồi âm thứ {n}",
    "home.bau.titleOpen": "Đàn bầu, âm thực",
    "home.video.title": "Xem nghệ nhân biểu diễn",
    "home.video.all": "Xem cả 16 loại hình",
    "welcome.tagline": "Đồ án môn HCI về âm nhạc truyền thống Việt Nam",
    "welcome.enter": "Vào thăm ngay",
    "home.paths.title": "Bắt đầu từ đâu?",
    "home.paths.lead": "Bạn có thể đi theo vùng đất, theo từng cây đàn, hoặc theo dòng lịch sử.",
    "home.today.title": "Nghe thử một nhạc cụ",
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
    "nav.glossary": "Glossary",
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
    "player.synth": "Synthesised preview",
    "player.nowPlaying": "Now playing: {title}",
    "player.stopped": "Sound stopped.",
    "player.escHint": "Press Esc to stop",
    "player.noAudio": "This browser cannot play audio.",
    "btn.listen": "Listen",
    "btn.stop": "Stop",

    /* Media / instruments */
    "media.placeholder": "Photo coming soon",
    "media.altInstrument": "Photo of the {name}",
    "media.altGenre": "Image of {name}",
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
    "video.sourceTheatre": "Video: official YouTube channel of {channel}",
    "video.sourcePress": "Video: report by {channel}",
    "photo.credit": "Photo: {author} · {source} · {license}",
    "photo.unknown": "unknown author",
    "photo.pd": "Public domain",
    "video.watchAria": "Watch the {name} video on this page",
    "video.openAria": "Open the {name} video on YouTube (new tab)",

    /* Page descriptions */
    "page.home.title": "Home",
    "page.home.desc": "Watch performances from the three regions and pluck the đàn bầu.",
    "page.genres.title": "Genres",
    "page.genres.desc": "16 genres on a map: 10 inscribed by UNESCO and 6 other well-known ones such as chèo, tuồng and cải lương.",
    "page.instruments.title": "Instruments",
    "page.instruments.desc": "12 instruments grouped as string, wind and percussion, plus a virtual đàn bầu you can play.",
    "page.history.title": "History",
    "page.history.desc": "8 milestones, each with dates, sources and the points still under debate.",
    "page.glossary.title": "Glossary",
    "page.glossary.desc": "23 technical words explained in plain language, with sounds, links to play and videos.",
    "next.title": "Where next",

    /* Footer */
    "footer.explore": "Pages",
    "footer.about": "Sources and credits",
    "footer.aboutText": "A Human–Computer Interaction (HCI/UX) course project. Content is for learning purposes.",
    "footer.synthNote": "Instrument sounds in the listening and playing sections are simulated with Web Audio, not recordings of real instruments.",
    "footer.motif": "The đàn bầu emblem, instrument drawings and background patterns were drawn for this site in a woodcut style; they do not copy any specific artefact or artwork.",
    "footer.videoNote": "Videos come from the YouTube channels of UNESCO, state theatres and state media. Photos come from Wikimedia Commons and VGP News; the author and licence are shown under each photo.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Back to top",

    /* Genres page */
    "genres.meta.title": "Musical genres | Âm Sắc Việt",
    "genres.meta.desc": "A map of 16 traditional Vietnamese musical genres, 10 of them inscribed by UNESCO, with photos, descriptions and performance videos.",
    "genres.title": "Musical genres",
    "genres.lead": "16 genres: 10 inscribed by UNESCO and 6 other well-known ones.",
    "genres.live": "Now showing: {name}",
    "hist.meta.title": "History of traditional music | Âm Sắc Việt",
    "hist.meta.desc": "Eight milestones in the history of traditional Vietnamese music, from lithophones and bronze drums to today, with dates, sources and the points still under debate.",
    "hist.title": "A history of traditional music",
    "hist.nav.label": "Choose a period",
    "hist.facts": "Dated events",
    "hist.debate": "Still debated",
    "hist.sources": "Sources ({n})",
    "hist.listen": "Listen, watch and play",
    "hist.rec": "Recording: {name}",
    "hist.read": "Read about {name}",
    "hist.try": "Play the {name}",
    "hist.synthNote": "Instrument sounds are simulated. The videos are real recordings, with the source under each one.",
    "hist.live": "Now viewing: {title}",
    "hist.method.title": "How we wrote this page",
    "hist.method.text": "Dates are checked against historical records (the Đại Việt sử ký toàn thư chronicle), the National Museum of Vietnamese History, UNESCO files and published research. Anything that comes only from legend, or where sources disagree, goes under “Still debated” instead of being stated as settled fact. These eight milestones are only highlights; the musical history of Vietnam's 54 ethnic groups is far wider.",
    "media.altHistory": "Illustration: {name}",
    "genres.filter.label": "Filter by region",
    "genres.filter.all": "All",
    "genres.filter.short": "Region",
    "genres.group.short": "Group",
    "genres.group.label": "Filter by group",
    "genres.group.unesco": "Inscribed by UNESCO",
    "genres.group.other": "Other genres",
    "genres.legend.unesco": "Inscribed by UNESCO",
    "genres.legend.other": "Other well-known genres",
    "genres.badge.national": "National heritage {year}",
    "genres.badge.nationalNoYear": "National heritage",
    "genres.badge.none": "Traditional genre",
    "genres.noVideo": "There is no video we are allowed to use for this genre yet.",
    "genres.count": "Showing {n} genres",
    "genres.empty": "No genre matches both the selected region and group.",
    "genres.map.aria": "Map of Vietnam marking where the 16 genres are kept alive",
    "genres.map.sea": "Biển Đông (East Sea)",
    "genres.map.hoangSa": "Hoàng Sa Archipelago",
    "genres.map.truongSa": "Trường Sa Archipelago",
    "genres.map.source": "Borders: Natural Earth. A small dot at the end of a connecting line marks the real place.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Where it is practised",
    "genres.panel.list": "Recognition",
    "genres.panel.instruments": "Common instruments",
    "genres.panel.noInstruments": "Mostly voices, usually sung without accompaniment.",
    "genres.panel.media": "Watch a performance",
    "genres.panel.prev": "Previous genre",
    "genres.panel.next": "Next genre",
    "genres.list.title": "All genres",

    /* Instruments page */
    "inst.meta.title": "Instruments | Âm Sắc Việt",
    "inst.meta.desc": "12 traditional Vietnamese instruments grouped as string, wind and percussion, with pictures, descriptions, sounds and a virtual đàn bầu to play.",
    "inst.title": "Traditional instruments",
    "inst.filter.label": "Filter by instrument family",
    "inst.filter.all": "All",
    "inst.hint.all": "Instruments are grouped by how they make sound: string, wind and percussion.",
    "inst.hint.string": "String: the sound comes from a stretched string, plucked with fingers, a stick or picks, or bowed.",
    "inst.hint.wind": "Wind: the sound comes from breath blown across a hole, through a free reed or through a double reed.",
    "inst.hint.percussion": "Percussion: the sound comes from striking a stretched skin (drums) or the body of the instrument itself (clappers, gongs, bamboo tubes).",
    "inst.search.label": "Search by name",
    "inst.search.placeholder": "For example: đàn bầu, sáo, khèn",
    "inst.count": "Showing {n} instruments",
    "inst.empty.title": "No instruments found",
    "inst.empty.text": "No instrument matches “{q}” in the selected family.",
    "inst.empty.reset": "Clear search and filter",
    "inst.modal.close": "Close",
    "inst.modal.branch": "Subgroup",
    "inst.modal.people": "Ethnic groups",
    "inst.modal.material": "Materials",
    "inst.modal.play": "How it is played",
    "inst.modal.genres": "Heard in",
    "inst.modal.noGenres": "Not part of the genres on the Genres page.",
    "inst.modal.prev": "Previous instrument",
    "inst.modal.next": "Next instrument",
    "inst.bau.title": "Virtual đàn bầu",
    "inst.play.title": "Play the instruments",
    "inst.play.disclaimer": "These sounds are simulated by the computer. They come close, but they are not the real instruments. To hear musicians play, watch the videos on the Genres page.",
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
    "inst.pad.cong": "Bossed gong (cồng)",
    "inst.pad.gong": "Flat gong (chiêng)",
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
    "gloss.all": "Open in the Glossary",
    "gloss.close": "Close",
    "gloss.here": "Go to this entry",
    "glossary.meta.title": "Glossary | Âm Sắc Việt",
    "glossary.meta.desc": "23 technical words about traditional Vietnamese music, explained in plain language, with sounds, links to play and performance videos.",
    "glossary.title": "Glossary",
    "glossary.lead": "The 23 technical words used across the site, where they have a dotted underline.",
    "glossary.filter.label": "Filter by group",
    "glossary.filter.all": "All",
    "glossary.group.sound": "Playing and sound",
    "glossary.group.parts": "Instruments and their parts",
    "glossary.group.performance": "Performance and repertoire",
    "glossary.group.unesco": "UNESCO titles",
    "glossary.search.label": "Find a term",
    "glossary.search.placeholder": "For example: harmonic, tremolo, ca trù",
    "glossary.count": "{n} terms",
    "glossary.count1": "1 term",
    "glossary.empty.title": "No matching terms",
    "glossary.empty.text": "No term matches “{q}” in the selected group.",
    "glossary.empty.reset": "Clear search and filter",
    "glossary.sound.am-thuc": "to an open string",
    "glossary.sound.am-boi": "to harmonics",
    "glossary.sound.am-thuc.title": "Đàn bầu open string (simulated)",
    "glossary.sound.am-boi.title": "Đàn bầu harmonics 2, 3, 4 (simulated)",
    "glossary.watch": "Watch {name}",
    "glossary.scales": "Compare five and seven notes",
    "glossary.related": "Related:",
    "glossary.history": "History: {name}",
    "glossary.unescoList": "Genres inscribed by UNESCO",
    "scale.title": "Five notes and seven notes",
    "scale.penta": "Five-note scale (pentatonic)",
    "scale.hepta": "Seven-note scale",
    "scale.run": "Play the scale",
    "scale.timbre": "Choose a sound",
    "scale.timbre.tranh": "Đàn tranh sound",
    "scale.timbre.sao": "Sáo trúc sound",
    "scale.missing": "No {note}",
    "scale.steps.penta": "Steps between notes: 1 · 1½ · 1 · 1 · 1½ tones",
    "scale.steps.hepta": "Steps between notes: 1 · 1 · ½ · 1 · 1 · 1 · ½ tones",
    "scale.explain1": "The seven-note scale C D E F G A B has two places where neighbouring notes are only a semitone apart: E–F and B–C (marked on the lower row). The five-note scale on the upper row leaves out E and B, so it has no semitone steps at all, only whole tones and tone-and-a-half steps. Many Vietnamese folk melodies are built on a five-note scale.",
    "scale.explain2": "The đàn tranh strings in the playing section use exactly these five notes (starting on D: D, F, G, A, C), which is why any swipe sounds natural.",
    "scale.explain3": "This is only the simplest part. Traditional music also has modes called “hơi”, such as hơi Bắc and hơi Nam, with their own ornaments and pitches that a keyboard cannot play exactly.",
    "scale.try": "Try swiping the đàn tranh",
    "rec.heading": "Record what you play",
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
    "home.meta.desc": "Traditional Vietnamese music: 16 genres with performance videos, 12 instruments you can try, 8 historical milestones with sources.",
    "home.hero.title": "Traditional music from three regions",
    "home.hero.lead": "From the bronze drums of Đông Sơn to the songs inscribed by UNESCO: 16 genres, 12 instruments and eight milestones in the history of traditional Vietnamese music.",
    "home.hero.cta": "Start exploring",
    "home.hero.cta2": "Play the đàn bầu",
    "home.screen.north": "Northern Vietnam",
    "home.screen.northSub": "Quan họ Bắc Ninh folk songs",
    "home.screen.badge": "Watch performance",
    "home.screen.rec": "Watch a performance: {name}",
    "home.screen.recExternal": "Watch a performance: {name} (opens YouTube in a new tab)",
    "rec.close": "Close",
    "rec.title": "{name}: performance video",
    "home.screen.northAlt": "Men and women singing quan họ under a festival tent at the Lim festival, Bắc Ninh, with people watching around them.",
    "home.screen.central": "Central Vietnam",
    "home.screen.centralSub": "Nhã nhạc, Huế royal court music",
    "home.screen.centralAlt": "Nhã nhạc musicians in red and gold robes playing drums and oboes at a performance during the 2008 Huế Festival.",
    "home.screen.south": "Southern Vietnam",
    "home.screen.southSub": "Đờn ca tài tử music",
    "home.screen.southAlt": "Photo from 1911: a đờn ca tài tử group in Sài Gòn seated with đàn tranh, đàn kìm, đàn cò and đàn tỳ bà.",
    "home.bau.label": "A đàn bầu. Press the string at different spots to hear it; with a keyboard, press Enter to pluck in turn.",
    "home.bau.hint": "Touch the string to hear it. Near the tuning peg you get clear, high harmonics; near the rod you get the open string (âm thực).",
    "home.bau.open": "Open string (âm thực)",
    "home.bau.harmonic": "Harmonic {n}",
    "home.bau.title": "Đàn bầu, harmonic {n}",
    "home.bau.titleOpen": "Đàn bầu, open string",
    "home.video.title": "Watch artists perform",
    "home.video.all": "See all 16 genres",
    "welcome.tagline": "An HCI course project about traditional Vietnamese music",
    "welcome.enter": "Visit now",
    "home.paths.title": "Where to start?",
    "home.paths.lead": "Follow the regions, the instruments, or the history.",
    "home.today.title": "Listen to one instrument",
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


/* ======================================================================
   PHẦN 2: DỮ LIỆU: NHẠC CỤ, LOẠI HÌNH, LỊCH SỬ, THUẬT NGỮ (ASV_DATA)
   ====================================================================== */

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

  /* 16 loại hình (10 được UNESCO ghi danh, 6 loại hình khác)
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
      place: { vi: "Vùng Kinh Bắc (Bắc Ninh và Bắc Giang cũ, nay đều thuộc tỉnh Bắc Ninh)", en: "Kinh Bắc region (Bắc Ninh and former Bắc Giang, now both part of Bắc Ninh province)" },
      lat: 21.18, lon: 106.07,
      unesco: {
        year: 2009,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/anh/quan-ho.jpg",
      photo: {
        author: "Nguyễn Đông Sơn", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:Quan_h%E1%BB%8D_giao_duy%C3%AAn_-_h%E1%BB%99i_Lim,_B%E1%BA%AFc_Ninh.JPG",
        caption: { vi: "Hát quan họ giao duyên ở hội Lim, Bắc Ninh", en: "Quan họ courtship singing at the Lim festival, Bắc Ninh" }
      },
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
      image: "images/loai-hinh/anh/ca-tru.jpg",
      photo: {
        author: "Michael Coghlan", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
        page: "https://commons.wikimedia.org/wiki/File:Ca_tr%C3%B9_performance.jpg",
        caption: { vi: "Một buổi ca trù ở Hà Nội", en: "A ca trù performance in Hà Nội" }
      },
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
      image: "images/loai-hinh/anh/hat-xoan.jpg",
      photo: {
        author: "Sở Văn hóa, Thể thao và Du lịch Phú Thọ", source: "hồ sơ UNESCO",
        license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://ich.unesco.org/en/RL/xoan-singing-of-phu-th-province-viet-nam-01260",
        caption: { vi: "Hát xoan tại miếu Lãi Lèn, Phú Thọ", en: "Xoan singing at Lãi Lèn temple, Phú Thọ" }
      },
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
      image: "images/loai-hinh/anh/nha-nhac.jpg",
      photo: {
        author: "Lưu Ly", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Nh%C3%A3_nh%E1%BA%A1c_cung_%C4%91%C3%ACnh_Hu%E1%BA%BF.JPG",
        caption: { vi: "Nhã nhạc cung đình Huế tại Festival Huế 2008", en: "Nhã nhạc at the 2008 Huế Festival" }
      },
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
      image: "images/loai-hinh/anh/vi-giam.jpg",
      photo: {
        author: "Lan Anh", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/lien-hoan-vi-dam-dang-nguoi-cau-hat-dan-ca-102126833.htm",
        caption: { vi: "Một tiết mục ví, giặm tại Liên hoan các câu lạc bộ dân ca tỉnh Nghệ An ở Vinh, năm 2012", en: "A ví and giặm performance at the Nghệ An folk song clubs festival in Vinh, 2012" }
      },
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
      image: "images/loai-hinh/anh/bai-choi.jpg",
      photo: {
        author: "Lê Tấn Lộc", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:B%C3%A0i_ch%C3%B2i_H%E1%BB%99i_An.JPG",
        caption: { vi: "Hội bài chòi ở Hội An", en: "A bài chòi game in Hội An" }
      },
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
        vi: "Năm tỉnh Tây Nguyên khi được ghi danh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (từ năm 2025 thuộc các tỉnh Quảng Ngãi, Gia Lai, Đắk Lắk, Lâm Đồng)",
        en: "The five Central Highlands provinces at the time of inscription: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (since 2025 part of Quảng Ngãi, Gia Lai, Đắk Lắk and Lâm Đồng)"
      },
      lat: 12.90, lon: 108.05,
      unesco: {
        year: 2005,
        note: { vi: "Công nhận là Kiệt tác năm 2005; ghi danh vào Danh sách đại diện năm 2008", en: "Proclaimed a Masterpiece in 2005; inscribed on the Representative List in 2008" }
      },
      image: "images/loai-hinh/anh/cong-chieng.jpg",
      photo: {
        author: "DA", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/gin-giu-va-phat-huy-di-san-van-hoa-phi-vat-the-tao-dong-luc-cho-phat-trien-du-lich-102230906121936739.htm",
        caption: { vi: "Đồng bào Tây Nguyên mang trống và cồng chiêng trong một buổi giới thiệu văn hóa cồng chiêng ở Gia Lai", en: "Central Highlands people carrying a drum and gongs at a gong culture event in Gia Lai" }
      },
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
      image: "images/loai-hinh/anh/tai-tu.jpg",
      photo: {
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_(1911).jpeg",
        caption: { vi: "Một ban đờn ca tài tử ở Sài Gòn năm 1911, in trên một tờ quảng cáo", en: "A đờn ca tài tử group in Sài Gòn in 1911, printed on a poster" }
      },
      video: { youtube: "5M4h4AGteGU", unesco: "https://ich.unesco.org/en/RL/00733", credit: "© 2011 Vietnamese Institute for Musicology" },
      instruments: ["dan-nguyet", "dan-tranh", "dan-nhi", "dan-bau", "sao-truc", "phach"],
      desc: {
        vi: "Đờn ca tài tử hình thành ở Nam Bộ vào cuối thế kỷ 19, là lối chơi nhạc thân mật của những người “tài tử” yêu nghệ thuật. Họ quây quần trong sân nhà, trên ghe thuyền hay trong ngày đám tiệc, cùng đờn, cùng ca và ngẫu hứng quanh những bài bản quen thuộc. Từ đờn ca tài tử, nghệ thuật cải lương đã ra đời.",
        en: "Đờn ca tài tử emerged in southern Vietnam in the late 19th century as intimate music made by amateur “tài tử” enthusiasts. They gather in courtyards, on boats or at family celebrations, playing and singing together and improvising around well-known pieces. This tradition gave birth to cải lương, the southern reformed theatre."
      }
    },

    /* ---- Loại hình được UNESCO ghi danh như một phần của di sản lớn hơn ---- */
    {
      id: "hat-van",
      name: { vi: "Hát văn (trong Thực hành tín ngưỡng thờ Mẫu Tam phủ)", en: "Hát văn (part of the Mother Goddess worship practices)" },
      short: "Hát văn",
      region: "north",
      place: { vi: "Nhiều nơi ở Bắc Bộ; nổi tiếng ở Phủ Giầy (Nam Định cũ, nay thuộc tỉnh Ninh Bình)",
               en: "Many places in Northern Vietnam; best known at Phủ Giầy (formerly Nam Định, now Ninh Bình province)" },
      lat: 20.37, lon: 106.11,
      unesco: {
        year: 2016,
        note: { vi: "Danh sách đại diện, là một phần của di sản Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt",
                en: "Representative List, as part of the Practices related to the Việt beliefs in the Mother Goddesses of Three Realms" }
      },
      image: "images/loai-hinh/anh/hat-van.jpg",
      photo: {
        author: "Casablanca1911", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
        page: "https://commons.wikimedia.org/wiki/File:L%C3%AAn_%C4%91%E1%BB%93ng.jpg",
        caption: { vi: "Một buổi hầu đồng ở Phủ Giầy", en: "A hầu đồng ritual at Phủ Giầy" }
      },
      video: { youtube: "RdFbNpdV3Fo", unesco: "https://ich.unesco.org/en/RL/01064", credit: "© Vietnam National Institute of Culture and Arts Studies" },
      instruments: ["dan-nguyet", "trong", "phach"],
      desc: {
        vi: "Hát văn là lối hát của cung văn trong nghi lễ hầu đồng thờ Mẫu. Người cung văn chính vừa đàn nguyệt vừa hát, kèm trống, phách và cảnh, giữ nhịp cho người lên đồng múa. Mỗi giá đồng có làn điệu riêng, từ trang nghiêm đến rộn ràng. Năm 2016, UNESCO ghi danh Thực hành tín ngưỡng thờ Mẫu Tam phủ, trong đó có hát văn.",
        en: "Hát văn is the singing of the cung văn musicians in the hầu đồng mediumship ritual of Mother Goddess worship. The lead musician sings while playing the đàn nguyệt, with drum, clappers and a small cymbal keeping time for the medium's dances. Each spirit has its own melodies, from solemn to lively. In 2016 UNESCO inscribed the Mother Goddess worship practices, which include hát văn."
      }
    },
    {
      id: "then",
      name: { vi: "Thực hành Then của người Tày, Nùng, Thái", en: "Practices of Then by the Tày, Nùng and Thái peoples" },
      short: "Then",
      region: "north",
      place: { vi: "Miền núi phía Bắc, như Cao Bằng, Lạng Sơn, Tuyên Quang, Thái Nguyên",
               en: "The northern mountains, such as Cao Bằng, Lạng Sơn, Tuyên Quang and Thái Nguyên" },
      lat: 22.67, lon: 106.26,
      unesco: {
        year: 2019,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "images/loai-hinh/anh/then.jpg",
      photo: {
        author: "DTH-BD-NVT", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:Dan_Tinh_lute_from_Vietnam.jpg",
        caption: { vi: "Đàn tính, cây đàn dùng trong nghi lễ Then", en: "The đàn tính lute used in Then rituals" }
      },
      video: { youtube: "1cVpYm89scM", unesco: "https://ich.unesco.org/en/RL/01379", credit: "© UNESCO" },
      instruments: [],
      desc: {
        vi: "Then là nghi lễ tín ngưỡng của người Tày, Nùng và Thái. Thầy Then vừa hát vừa đàn, có khi múa, để cầu bình an, chữa bệnh hay mừng năm mới. Tiếng đàn tính bầu tròn cần dài hòa cùng chùm xóc nhạc rung trong tay. Lời Then kể chuyến đi lên trời gặp thần linh. Năm 2019, UNESCO ghi danh thực hành Then.",
        en: "Then is a ritual practice of the Tày, Nùng and Thái peoples. The Then master sings, plays and sometimes dances to pray for peace, cure illness or welcome the new year. The long-necked, gourd-bodied đàn tính lute blends with a bunch of small bells shaken in the hand. The lyrics tell of a journey to the heavens to meet the spirits. UNESCO inscribed the practice in 2019."
      }
    },

    /* ---- Các loại hình khác: di sản quốc gia hoặc loại hình tiêu biểu (không thuộc danh sách UNESCO) ---- */
    {
      id: "cheo",
      name: { vi: "Chèo", en: "Chèo" },
      short: "Chèo",
      region: "north",
      place: { vi: "Đồng bằng Bắc Bộ; nổi tiếng ở Thái Bình cũ (nay thuộc Hưng Yên), Bắc Ninh, Hà Nội",
               en: "The Red River Delta; well known in former Thái Bình (now Hưng Yên), Bắc Ninh and Hà Nội" },
      lat: 20.45, lon: 106.34,
      heritage: {
        year: 2025,
        badge: { vi: "Chèo Bắc Ninh: di sản quốc gia 2025", en: "Chèo of Bắc Ninh: national heritage 2025" },
        note: { vi: "Chèo Bắc Ninh được công nhận là di sản văn hóa phi vật thể quốc gia năm 2025",
                en: "Chèo of Bắc Ninh was recognised as national intangible cultural heritage in 2025" }
      },
      image: "images/loai-hinh/anh/cheo.jpg",
      photo: {
        author: "USIS", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:VoCheoQuanamThiKinh.jpg",
        caption: { vi: "Cảnh vở chèo Quan Âm Thị Kính (ảnh tư liệu)", en: "A scene from the chèo play Quan Âm Thị Kính (archive photo)" }
      },
      video: { youtube: "MQSYywLZmWY", channel: "Nhà hát Chèo Việt Nam", channelUrl: "https://www.youtube.com/@nhahatcheovietnam1534", kind: "theatre" },
      instruments: ["trong", "dan-nhi", "sao-truc", "dan-nguyet"],
      desc: {
        vi: "Chèo là sân khấu dân gian của đồng bằng Bắc Bộ, lớn lên từ những chiếu chèo diễn ở sân đình. Một vở chèo kết hợp hát, múa, nói lối và những vai hề dí dỏm, kể các tích quen thuộc như Quan Âm Thị Kính, Lưu Bình Dương Lễ. Dàn nhạc thường có trống, đàn nhị, sáo và đàn nguyệt.",
        en: "Chèo is the folk theatre of the Red River Delta, which grew out of performances on mats in village communal-house yards. A chèo play combines singing, dance, rhythmic speech and witty clown roles, telling familiar stories such as Quan Âm Thị Kính and Lưu Bình Dương Lễ. The ensemble usually has drums, đàn nhị, sáo and đàn nguyệt."
      }
    },
    {
      id: "tuong",
      name: { vi: "Tuồng (hát bội)", en: "Tuồng (hát bội)" },
      short: "Tuồng",
      region: "central",
      place: { vi: "Trung Bộ, mạnh nhất ở Bình Định cũ (nay thuộc Gia Lai), Quảng Nam cũ (nay thuộc Đà Nẵng) và Huế; cũng có ở Bắc Bộ, Nam Bộ",
               en: "Central Vietnam, strongest in former Bình Định (now Gia Lai), former Quảng Nam (now Đà Nẵng) and Huế; also found in the north and south" },
      lat: 15.57, lon: 108.47,
      image: "images/loai-hinh/anh/tuong.jpg",
      photo: {
        author: "Bùi Thụy Đào Nguyên", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:H%C3%A1t_tu%E1%BB%93ng_2014.jpg",
        caption: { vi: "Hát bội trong lễ Kỳ Yên ở đình Mỹ Phước, Long Xuyên, năm 2014", en: "Hát bội at the Kỳ Yên festival, Mỹ Phước communal house, Long Xuyên, 2014" }
      },
      video: { youtube: "Y42hnhQQsAM", channel: "Nhà hát Tuồng Việt Nam", channelUrl: "https://www.youtube.com/@nhahattuongvietnam", kind: "theatre" },
      instruments: ["trong", "ken-bau"],
      desc: {
        vi: "Tuồng, ở miền Nam gọi là hát bội, là sân khấu cổ diễn các tích trung hiếu, nghĩa liệt. Diễn viên vẽ mặt theo tính cách nhân vật: mặt đỏ là người trung dũng, mặt trắng mốc là kẻ gian thần. Động tác cách điệu, giọng hát mạnh mẽ, đi cùng tiếng trống và kèn. Tuồng phát triển rực rỡ dưới triều Nguyễn.",
        en: "Tuồng, called hát bội in the south, is a classical theatre of loyalty and righteousness. Actors paint their faces to show character: red for brave and loyal heroes, chalk-white for treacherous officials. Movements are stylised and the singing is powerful, driven by drums and oboes. Tuồng flourished under the Nguyễn dynasty."
      }
    },
    {
      id: "ca-hue",
      name: { vi: "Ca Huế", en: "Ca Huế" },
      short: "Ca Huế",
      region: "central",
      place: { vi: "Huế", en: "Huế" },
      lat: 16.46, lon: 107.59,
      heritage: {
        year: 2015,
        note: { vi: "Di sản văn hóa phi vật thể quốc gia (Quyết định 1877/QĐ-BVHTTDL, ngày 8/6/2015)",
                en: "National intangible cultural heritage (Decision 1877/QĐ-BVHTTDL, 8 June 2015)" }
      },
      image: "images/loai-hinh/anh/ca-hue.jpg",
      photo: {
        author: "Liftold", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:D%C3%A0n_nh%E1%BA%A1c_ca_Hu%E1%BA%BF_tr%C3%AAn_s%C3%B4ng_Hu%E1%BA%BF.JPG",
        caption: { vi: "Dàn nhạc ca Huế trên thuyền", en: "A ca Huế ensemble on a boat" }
      },
      video: { youtube: "40HN4CwbqdY", channel: "VTV3", channelUrl: "https://www.youtube.com/@VTV3GIAITRI", kind: "press" },
      instruments: ["dan-tranh", "ty-ba", "dan-nguyet", "dan-nhi", "sao-truc"],
      desc: {
        vi: "Ca Huế là lối hát thính phòng tao nhã của đất cố đô, từng vang trong phủ đệ rồi lan ra đời sống thường ngày. Bài bản chia hai điệu: điệu Bắc tươi vui, điệu Nam buồn thương. Người ca đi cùng đàn tranh, tỳ bà, nguyệt, nhị và sáo. Ngày nay nhiều người nghe ca Huế trên thuyền giữa sông Hương.",
        en: "Ca Huế is the refined chamber singing of the old capital, once heard in aristocratic residences before spreading into everyday life. Its pieces fall into two modes: the bright Bắc mode and the sorrowful Nam mode. Singers are accompanied by đàn tranh, tỳ bà, đàn nguyệt, đàn nhị and sáo. Today many people hear ca Huế on boats on the Hương River."
      }
    },
    {
      id: "ho",
      name: { vi: "Hò", en: "Hò work songs" },
      short: "Hò",
      region: "central",
      place: { vi: "Nhiều nơi ở Trung Bộ và Nam Bộ; tiêu biểu là hò khoan Lệ Thủy (Quảng Bình cũ, nay thuộc Quảng Trị)",
               en: "Across Central and Southern Vietnam; a well-known form is hò khoan Lệ Thủy (formerly Quảng Bình, now Quảng Trị)" },
      lat: 17.21, lon: 106.79,
      heritage: {
        badge: { vi: "Hò khoan Lệ Thủy: di sản quốc gia", en: "Hò khoan Lệ Thủy: national heritage" },
        note: { vi: "Hò khoan Lệ Thủy là di sản văn hóa phi vật thể quốc gia", en: "Hò khoan Lệ Thủy is national intangible cultural heritage" }
      },
      image: "images/loai-hinh/anh/ho.jpg",
      photo: {
        author: "Báo Nhân Dân", source: "nhandan.vn",
        license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://nhandan.vn/doc-dao-ho-khoan-le-thuy-post303235.html",
        caption: { vi: "Trình diễn hò khoan Lệ Thủy bên sông Kiến Giang", en: "Hò khoan Lệ Thủy performed by the Kiến Giang River" }
      },
      video: { youtube: "rBVs1Rg9o84", channel: "Báo Nhân Dân", channelUrl: "https://www.youtube.com/@baonhandanmedia", kind: "press" },
      instruments: [],
      desc: {
        vi: "Hò là những câu hát cất lên khi làm việc: chèo thuyền, kéo lưới, giã gạo, cấy lúa. Một người xướng câu hò, cả nhóm đáp lại theo nhịp lao động. Mỗi vùng có điệu riêng như hò mái nhì Huế hay hò Đồng Tháp. Hò khoan Lệ Thủy nổi tiếng với lối hò đối đáp giao duyên trong những đêm hội.",
        en: "Hò are songs sung while working: rowing, hauling nets, pounding rice or planting. One person leads a line and the group answers in the rhythm of the work. Each region has its own style, such as hò mái nhì of Huế or hò of Đồng Tháp. Hò khoan Lệ Thủy is known for its playful call-and-response courting songs on festival nights."
      }
    },
    {
      id: "cai-luong",
      name: { vi: "Cải lương", en: "Cải lương" },
      short: "Cải lương",
      region: "south",
      place: { vi: "Nam Bộ; buổi diễn thường được coi là đầu tiên ở Mỹ Tho (nay thuộc Đồng Tháp)",
               en: "Southern Vietnam; the performance usually counted as the first was in Mỹ Tho (now in Đồng Tháp)" },
      lat: 10.36, lon: 106.36,
      image: "images/loai-hinh/anh/cai-luong.jpg",
      photo: {
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:T%C3%A2y-Thi_-_Saigon,_August_1927_-_B%C3%B9i_Quang_Tu%E1%BA%A5n_(3_June_2020).jpg",
        caption: { vi: "Tờ chương trình vở cải lương Tây Thi ở Sài Gòn, tháng 8 năm 1927", en: "Programme for the cải lương play Tây Thi, Sài Gòn, August 1927" }
      },
      video: { youtube: "xiNl0rkOhBg", channel: "Nhà hát Cải lương Trần Hữu Trang", channelUrl: "https://www.youtube.com/@nhcl.tranhuutrangofficial", kind: "theatre" },
      instruments: ["dan-nguyet", "dan-tranh", "dan-nhi"],
      desc: {
        vi: "Cải lương ra đời ở Nam Bộ đầu thế kỷ 20, khi lối đờn ca tài tử bước lên sân khấu với tích truyện, phục trang và cảnh trí. Bài quan trọng nhất của cải lương là vọng cổ, phát triển từ bài Dạ cổ hoài lang của Cao Văn Lầu. Dàn nhạc có đàn kìm, đàn tranh, đàn cò và cây ghi-ta phím lõm.",
        en: "Cải lương was born in southern Vietnam in the early 20th century, when đờn ca tài tử moved onto the stage with stories, costumes and scenery. Its most important melody is vọng cổ, which grew out of Cao Văn Lầu's Dạ cổ hoài lang. The ensemble includes the đàn kìm, đàn tranh, đàn cò and a guitar with scalloped frets."
      }
    },
    {
      id: "ngu-am",
      name: { vi: "Nhạc ngũ âm của người Khmer", en: "Ngũ âm music of the Khmer people" },
      short: "Ngũ âm Khmer",
      region: "south",
      place: { vi: "Cộng đồng người Khmer Nam Bộ, như ở Sóc Trăng cũ (nay thuộc Cần Thơ) và Trà Vinh cũ (nay thuộc Vĩnh Long)",
               en: "Khmer communities of the south, such as former Sóc Trăng (now Cần Thơ) and former Trà Vinh (now Vĩnh Long)" },
      lat: 9.60, lon: 105.97,
      heritage: {
        year: 2021,
        note: { vi: "Nghệ thuật trình diễn dân gian nhạc ngũ âm của người Khmer là di sản văn hóa phi vật thể quốc gia (2021)",
                en: "The Khmer folk performing art of ngũ âm music is national intangible cultural heritage (2021)" }
      },
      image: "images/loai-hinh/anh/ngu-am.jpg",
      photo: {
        author: "Lê Sơn", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/vinh-long-sap-dien-ra-le-hoi-ok-om-bok-dua-ghe-ngo-cung-nhieu-trai-nghiem-hap-dan-102261112105839068.htm",
        caption: { vi: "Trình diễn âm nhạc Khmer Nam Bộ tại Đại học Trà Vinh; hàng trước là đàn gỗ roneat, một nhạc cụ có trong dàn ngũ âm", en: "Southern Khmer music performed at Trà Vinh University; in front is the roneat xylophone, one of the instruments of the ngũ âm ensemble" }
      },
      video: { youtube: "phwtWLJsBDA", channel: "VTV5", channelUrl: "https://www.youtube.com/@vtv5tiengdantocthieuso", kind: "press" },
      instruments: [],
      desc: {
        vi: "Nhạc ngũ âm là dàn nhạc truyền thống của người Khmer Nam Bộ, vang lên trong lễ hội ở chùa, Tết Chôl Chnăm Thmây và nhiều nghi lễ của phum sóc. Tên gọi gắn với năm nhóm âm thanh của dàn nhạc: đồng, sắt, gỗ, da và hơi, như dàn cồng, đàn gỗ, trống và kèn. Năm 2021, nghệ thuật này được công nhận là di sản văn hóa phi vật thể quốc gia.",
        en: "Ngũ âm is the traditional ensemble of the Khmer people of southern Vietnam, played at pagoda festivals, the Chôl Chnăm Thmây new year and many village rituals. Its name refers to five groups of sound: bronze, iron, wood, skin and breath, as in gong circles, wooden xylophones, drums and oboes. In 2021 it was recognised as national intangible cultural heritage."
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
      short: { vi: "Đàn đá, trống đồng", en: "Lithophones, bronze drums" }, // tên ngắn trên thanh thời kỳ
      start: -700,
      period: { vi: "Thời tiền sử – thế kỷ 1", en: "Prehistory – 1st century CE" },
      title: { vi: "Đàn đá và trống đồng", en: "Lithophones and bronze drums" },
      summary: {
        vi: "Những nhạc cụ cổ nhất tìm thấy trên đất Việt Nam làm bằng đá và đồng. Đàn đá là những phiến đá được ghè đẽo để mỗi thanh gõ ra một cao độ riêng. Trống đồng của văn hóa Đông Sơn (khoảng thế kỷ 7 TCN đến thế kỷ 1) vừa là nhạc cụ vừa là vật dùng trong nghi lễ; mặt trống khắc người đánh trống, nhảy múa, chim bay và thuyền.",
        en: "The oldest instruments found in Vietnam are made of stone and bronze. Lithophones are stone slabs chipped so that each one rings at its own pitch. The bronze drums of the Đông Sơn culture (around the 7th century BCE to the 1st century CE) were both instruments and ritual objects; their surfaces show people drumming and dancing, birds in flight and boats."
      },
      facts: [
        { year: "1893", vi: "Trống đồng Ngọc Lũ được tìm thấy khi đắp đê ở làng Ngọc Lũ (Hà Nam cũ, nay thuộc Ninh Bình). Trống hiện trưng bày tại Bảo tàng Lịch sử Quốc gia ở Hà Nội.",
          en: "The Ngọc Lũ drum was found while villagers were building a dyke in Ngọc Lũ (former Hà Nam, now part of Ninh Bình). It is now on display at the National Museum of Vietnamese History in Hà Nội." },
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
      image: "images/lich-su/dong-son.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/dong-son.jpg",
        author: "VuThiAnh", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ngoc_Lu.jpg",
        caption: { vi: "Trống đồng Ngọc Lũ trưng bày tại Bảo tàng Lịch sử Quốc gia, Hà Nội",
                   en: "The Ngọc Lũ drum on display at the National Museum of Vietnamese History, Hà Nội" }
      },
      alt: { vi: "Ảnh chụp trống đồng Ngọc Lũ nhìn ngang trong tủ kính: tang trống phình, thân thắt lại, có hai cặp quai bện thừng và các vành hoa văn khắc chìm.",
             en: "Side view of the Ngọc Lũ bronze drum in a glass case: a bulging top, a narrow waist, two pairs of rope-patterned handles and bands of engraved decoration." }
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
        { year: "1121", vi: "Bia Sùng Thiện Diên Linh được dựng ở chùa Long Đọi Sơn (Hà Nam cũ, nay thuộc Ninh Bình). Văn bia tả cảnh múa rối trên mặt nước trong buổi lễ mừng thọ vua Lý Nhân Tông. Tấm bia nay là Bảo vật quốc gia.",
          en: "The Sùng Thiện Diên Linh stele was erected at Long Đọi Sơn pagoda (former Hà Nam, now part of Ninh Bình). Its text describes puppets performing on water at a celebration of King Lý Nhân Tông's longevity. The stele is now a National Treasure." },
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
      image: "images/lich-su/ly-tran.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/ly-tran.jpg",
        author: "TravellerMya", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
        page: "https://commons.wikimedia.org/wiki/File:Water_Puppet_Show_in_Vietnam_with_Two_Birds.jpg",
        caption: { vi: "Một buổi diễn múa rối nước ngày nay",
                   en: "A water puppet show today" }
      },
      alt: { vi: "Ảnh chụp sân khấu múa rối nước: những con rối chim và người sơn màu rực rỡ trên mặt nước, phía sau là tấm mành tre và rèm đỏ thêu rồng.",
             en: "Photo of a water puppet stage: brightly painted bird and figure puppets on the water, with a bamboo screen and a red embroidered curtain behind them." }
    },
    {
      id: "le",
      short: { vi: "Thời Lê", en: "The Lê era" }, // tên ngắn trên thanh thời kỳ
      start: 1428,
      period: { vi: "1428 – 1789", en: "1428 – 1789" },
      title: { vi: "Thời Lê: định lễ nhạc, hát cửa đình", en: "The Lê era: court ritual music and communal-house singing" },
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
      image: "images/lich-su/le.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/le.jpg",
        author: "Phương Huy", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:Tu_vi%E1%BB%87n_V%C4%A9nh_Nghi%C3%AAm,_c%E1%BB%95ng_tam_quan_(chi%E1%BA%BFc_kh%C3%A1nh_b%E1%BA%B1ng_%C4%91%C3%A1)_(4).jpg",
        caption: { vi: "Một chiếc khánh đá ngày nay treo ở cổng tam quan tu viện Vĩnh Nghiêm. Khánh là nhạc cụ quen thuộc trong lễ nhạc cung đình và chùa chiền.",
                   en: "A modern stone chime (khánh) hanging in the gate of Vĩnh Nghiêm monastery. The khánh was a familiar instrument in court ritual music and in temples." }
      },
      alt: { vi: "Ảnh chụp chiếc khánh đá màu xanh sẫm treo dưới mái gỗ, mặt khánh chạm nổi hai con rồng chầu mặt trời.",
             en: "Photo of a dark green stone chime hanging under a wooden roof, carved in relief with two dragons facing a sun." }
    },
    {
      id: "nguyen",
      short: { vi: "Triều Nguyễn", en: "The Nguyễn dynasty" }, // tên ngắn trên thanh thời kỳ
      start: 1802,
      period: { vi: "1802 – 1945", en: "1802 – 1945" },
      title: { vi: "Triều Nguyễn: nhã nhạc ở Huế", en: "The Nguyễn dynasty: nhã nhạc in Huế" },
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
      image: "images/lich-su/nguyen.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/nguyen.jpg",
        author: "Liftold", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:S%C3%A2n_kh%E1%BA%A5u_ch%C3%ADnh_c%E1%BB%A7a_Duy%E1%BB%87t_Th%E1%BB%8B_%C4%90%C6%B0%E1%BB%9Dng.JPG",
        caption: { vi: "Sân khấu chính của nhà hát Duyệt Thị Đường trong Đại Nội Huế",
                   en: "The main stage of the Duyệt Thị Đường royal theatre in the Huế Imperial City" }
      },
      alt: { vi: "Ảnh chụp sân khấu nhà hát cung đình: ngai vàng ở giữa trên bậc cao, hai bên là trống và lọng vàng, phía trên treo bức hoành chữ Hán.",
             en: "Photo of the royal theatre stage: a golden throne on a raised platform, drums and yellow parasols on each side, and a board with Chinese characters above." }
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
        { year: "1918", vi: "Vở Kim Vân Kiều diễn ở Mỹ Tho (Tiền Giang cũ, nay thuộc Đồng Tháp) thường được lấy làm mốc ra đời của cải lương. Năm 2018, giới sân khấu cả nước kỷ niệm 100 năm sân khấu cải lương.",
          en: "A staging of Kim Vân Kiều in Mỹ Tho (former Tiền Giang, now part of Đồng Tháp) is usually taken as the birth of cải lương. In 2018, theatres across Vietnam celebrated 100 years of cải lương." },
        { year: "1919", vi: "Nhạc sĩ Cao Văn Lầu (Sáu Lầu) ở Bạc Liêu (nay thuộc Cà Mau) viết bài Dạ cổ hoài lang. Bài này về sau phát triển thành bản vọng cổ, bài quan trọng bậc nhất của cải lương.",
          en: "Composer Cao Văn Lầu (Sáu Lầu) of Bạc Liêu (now part of Cà Mau) wrote Dạ cổ hoài lang. It later grew into vọng cổ, the most important melody in cải lương." },
        { year: "2013", vi: "UNESCO ghi danh Nghệ thuật đờn ca tài tử Nam Bộ vào Danh sách di sản văn hóa phi vật thể đại diện của nhân loại.",
          en: "UNESCO inscribed the art of Đờn ca tài tử music and song in southern Vietnam on the Representative List." }
      ],
      debate: {
        vi: "Mốc 1918 chưa được mọi người đồng ý: có nhà nghiên cứu đề nghị năm 1917, với vở Vì nghĩa quên nhà ở Sa Đéc (Đồng Tháp). Năm sáng tác Dạ cổ hoài lang cũng có tài liệu ghi 1917, 1918 hoặc 1920, nhưng nhiều nguồn thống nhất là 1919.",
        en: "Not everyone accepts 1918: one researcher proposes 1917, with the play Vì nghĩa quên nhà in Sa Đéc (Đồng Tháp). Some sources also date Dạ cổ hoài lang to 1917, 1918 or 1920, though most agree on 1919."
      },
      sources: [
        { vi: "UNESCO: Đờn ca tài tử", en: "UNESCO: Art of Đờn ca tài tử music and song",
          url: "https://ich.unesco.org/en/RL/art-of-don-ca-tai-tu-music-and-song-in-south-viet-nam-00733" },
        { vi: "Tạp chí Nghiên cứu và Phát triển: Một trăm năm cải lương là năm nào?", en: "Research and Development journal: Which year marks 100 years of cải lương?",
          url: "https://vjol.info.vn/ncpt-hue/article/view/38427" }
      ],
      genres: ["tai-tu"], instruments: ["dan-nguyet", "dan-tranh"],
      image: "images/lich-su/tai-tu-cai-luong.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/loai-hinh/anh/tai-tu.jpg",
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_(1911).jpeg",
        caption: { vi: "Một ban đờn ca tài tử ở Sài Gòn năm 1911, in trên một tờ quảng cáo",
                   en: "A đờn ca tài tử group in Sài Gòn in 1911, printed on a poster" }
      },
      alt: { vi: "Bưu thiếp đen trắng năm 1911: nhóm nhạc công mặc áo dài, đội khăn xếp, người ngồi người đứng, cầm đàn tranh, đàn tỳ bà, đàn kìm và đàn cò.",
             en: "Black-and-white postcard from 1911: musicians in long tunics and turbans, some seated and some standing, holding đàn tranh, đàn tỳ bà, đàn kìm and đàn cò." }
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
      image: "images/lich-su/hien-dai.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/hien-dai.jpg",
        author: "Adir Benyamini", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:The_Vietnam_National_Academy_of_Music_SAM_0397.jpg",
        caption: { vi: "Tòa phòng hòa nhạc của Học viện Âm nhạc Quốc gia Việt Nam, Hà Nội",
                   en: "The concert hall of the Vietnam National Academy of Music, Hà Nội" }
      },
      alt: { vi: "Ảnh chụp tòa nhà màu kem có hàng cột tròn cao của Học viện Âm nhạc Quốc gia Việt Nam.",
             en: "Photo of the cream-coloured building with tall round columns at the Vietnam National Academy of Music." }
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
      image: "images/lich-su/unesco.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/loai-hinh/anh/hat-xoan.jpg",
        author: "Sở Văn hóa, Thể thao và Du lịch Phú Thọ", source: "hồ sơ UNESCO", license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://ich.unesco.org/en/RL/xoan-singing-of-phu-th-province-viet-nam-01260",
        caption: { vi: "Hát xoan tại miếu Lãi Lèn, Phú Thọ. Năm 2017 hát xoan được chuyển từ danh sách cần bảo vệ khẩn cấp sang danh sách đại diện.",
                   en: "Xoan singing at Lãi Lèn temple, Phú Thọ. In 2017 xoan singing moved from the urgent safeguarding list to the representative list." }
      },
      alt: { vi: "Ảnh chụp bốn đào xoan mặc áo dài đỏ, đội khăn, đứng hát trước ban thờ trong miếu, người xem ngồi quanh trên chiếu.",
             en: "Photo of four xoan singers in red dresses and headscarves singing before the altar inside the temple, with the audience seated around them on mats." }
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
      image: "images/lich-su/hom-nay.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "images/lich-su/anh/hom-nay.jpg",
        author: "Cục Hợp tác quốc tế (Bộ VHTTDL)", source: "Báo Điện tử Chính phủ", license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://baochinhphu.vn/tinh-hoa-am-nhac-truyen-thong-viet-nam-toa-sang-tai-expo-2025-102250420143328483.htm",
        caption: { vi: "Khách tham quan chơi thử đàn t'rưng tại EXPO 2025 ở Osaka, Nhật Bản",
                   en: "Visitors trying the đàn t'rưng at EXPO 2025 in Osaka, Japan" }
      },
      alt: { vi: "Ảnh chụp một nghệ sĩ mặc áo dài hồng hướng dẫn khách, cả người lớn và trẻ em, gõ thử cây đàn t'rưng bằng ống tre.",
             en: "Photo of a performer in a pink áo dài showing visitors, adults and children, how to play a bamboo đàn t'rưng." }
    }
  ],

  /* Thuật ngữ: bấm vào chữ có gạch chấm trong bài để xem giải thích (common.js, ASV.Glossary);
     danh sách đầy đủ ở glossary.html (glossary.js), xếp theo nhóm, giữ thứ tự dưới đây (dễ trước, khó sau).
     group: sound (cách chơi, âm thanh) | parts (nhạc cụ, bộ phận) | performance (biểu diễn, bài bản) | unesco
     see: liên kết trên trang Thuật ngữ. listen = khóa ASV.playables (âm mô phỏng); try = nhạc cụ để chơi thử;
          recording = loại hình có video thật; instruments/genres = link thêm; history = id mốc lịch sử;
          scales = link phần "Năm âm và bảy âm"; unescoList = link danh sách loại hình UNESCO ghi danh.
     match: các cách viết sẽ được nhận ra trong bài (không phân biệt hoa thường; bản EN tự bỏ dấu).
     Chỉ ghi định nghĩa chắc chắn; thêm từ mới thì thêm cả vi và en. */
  glossary: [
    { id: "am-thuc", group: "sound", see: { listen: "term:am-thuc", try: "dan-bau" },
      term: { vi: "Âm thực", en: "Open string (âm thực)" },
      match: { vi: ["âm thực"], en: ["open string", "open strings", "âm thực"] },
      def: { vi: "Tiếng của dây đàn khi gảy mà tay không chạm vào điểm nút nào, còn gọi là tiếng dây buông. Trên đàn bầu, âm thực thấp hơn và ít trong hơn âm bồi.",
             en: "The sound of a string plucked without touching any node, also called the open string. On the đàn bầu it is lower and less bell-like than a harmonic." } },
    { id: "am-boi", group: "sound", see: { listen: "term:am-boi", try: "dan-bau" },
      term: { vi: "Âm bồi", en: "Harmonic (âm bồi)" },
      match: { vi: ["âm bồi", "bồi âm"], en: ["harmonic", "harmonics", "âm bồi"] },
      def: { vi: "Tiếng trong và cao, có được khi cạnh bàn tay chạm nhẹ vào một điểm nút trên dây đúng lúc gảy. Chạm ở giữa dây (1/2) được âm cao gấp đôi âm thực, chạm ở 1/3 dây được âm cao gấp ba.",
             en: "A clear, high tone made by lightly touching a node on the string with the edge of the hand while plucking. Touching at the middle (1/2) gives twice the frequency of the open string, at 1/3 gives three times." } },
    { id: "diem-nut", group: "sound", see: { listen: "term:am-boi", try: "dan-bau" },
      term: { vi: "Điểm nút", en: "Node" },
      match: { vi: ["điểm nút"], en: ["node", "nodes"] },
      def: { vi: "Điểm chia dây thành các phần bằng nhau (1/2, 1/3, 1/4…). Chạm nhẹ vào đó thì dây không rung cả chiều dài mà rung thành nhiều đoạn ngắn, cho ra âm bồi.",
             en: "A point that divides the string into equal parts (1/2, 1/3, 1/4…). Touch it lightly and the string vibrates in several short sections instead of its full length, giving a harmonic." } },
    { id: "can-dan", group: "parts", see: { try: "dan-bau" },
      term: { vi: "Cần đàn (đàn bầu)", en: "Rod (cần đàn)" },
      match: { vi: ["cần đàn"], en: ["the rod", "cần đàn"] },
      def: { vi: "Thanh dẻo cắm ở một đầu đàn bầu, đầu dây buộc vào đó. Đẩy cần đàn làm dây chùng, tiếng thấp xuống; kéo ngược lại làm dây căng, tiếng cao lên.",
             en: "The flexible rod at one end of the đàn bầu, where the string is tied. Bending it one way slackens the string and lowers the pitch; bending it the other way tightens the string and raises it." } },
    { id: "ve", group: "sound", see: { listen: "instrument:ty-ba", try: "ty-ba", instruments: ["dan-nguyet", "dan-tranh"] },
      term: { vi: "Vê", en: "Tremolo (vê)" },
      match: { vi: ["vê"], en: ["tremolo"] },
      def: { vi: "Gảy liên tục thật nhanh vào một dây để tiếng đàn nghe như ngân dài không dứt. Đàn tỳ bà, đàn nguyệt và đàn tranh hay dùng cách chơi này.",
             en: "Plucking one string again and again very fast so the note seems to sustain. Common on the tỳ bà, đàn nguyệt and đàn tranh." } },
    { id: "luyen", group: "sound", see: { try: "dan-nhi", instruments: ["sao-truc"] },
      term: { vi: "Luyến", en: "Glide (luyến)" },
      match: { vi: ["luyến"], en: ["glide", "glides"] },
      def: { vi: "Đi từ nốt này sang nốt khác liền một hơi hoặc một đường cung, không ngắt tiếng ở giữa.",
             en: "Moving from one note to the next in one breath or one bow stroke, without a break in the sound." } },
    { id: "con-nhan", group: "parts", see: { listen: "instrument:dan-tranh", try: "dan-tranh" },
      term: { vi: "Con nhạn", en: "Bridge (con nhạn)" },
      match: { vi: ["con nhạn"], en: ["bridges", "con nhạn"] },
      def: { vi: "Miếng gỗ nhỏ kê dưới mỗi dây đàn tranh. Xê dịch con nhạn là đổi cao độ của dây đó.",
             en: "A small wooden piece under each string of the đàn tranh. Moving it changes the pitch of that string." } },
    { id: "luoi-ga", group: "parts", see: { listen: "instrument:khen", try: "khen" },
      term: { vi: "Lưỡi gà", en: "Free reed (lưỡi gà)" },
      match: { vi: ["lưỡi gà"], en: ["free reed"] },
      def: { vi: "Lá kim loại rất mỏng gắn trong ống. Hơi thổi vào hay hút ra đều làm lá rung và phát ra tiếng. Khèn của người Mông dùng lưỡi gà bằng đồng.",
             en: "A very thin metal tongue fixed inside a pipe. Blowing in or drawing breath out both make it vibrate and sound. The Mông khèn uses brass free reeds." } },
    { id: "dam-kep", group: "parts", see: { listen: "instrument:ken-bau", try: "ken-bau" },
      term: { vi: "Dăm kép", en: "Double reed (dăm kép)" },
      match: { vi: ["dăm kép", "dăm kèn"], en: ["double reed"] },
      def: { vi: "Hai lá mỏng ép sát nhau ở đầu kèn. Thổi mạnh làm hai lá rung đập vào nhau, cho tiếng kèn vang và khỏe. Kèn bầu là kèn dăm kép.",
             en: "Two thin blades pressed together at the top of the instrument. Blowing hard makes them vibrate against each other, giving a loud, strong sound. The kèn bầu is a double-reed instrument." } },
    { id: "tri-am", group: "parts", see: { listen: "instrument:khen", try: "khen" },
      term: { vi: "Ống trì âm", en: "Drone pipe" },
      match: { vi: ["ống trì âm"], en: ["drone pipe"] },
      def: { vi: "Ống giữ một nốt vang suốt khi chơi, làm nền cho giai điệu (âm trì tục). Ở phần chơi thử, khèn luôn có ống trì âm nốt Rê vang cùng.",
             en: "A pipe that holds one note throughout, under the melody. In the playing section, the khèn always sounds its D drone pipe along with the other pipes." } },
    { id: "tang-trong", group: "parts", see: { listen: "instrument:trong", try: "trong" },
      term: { vi: "Tang trống", en: "Drum body (tang trống)" },
      match: { vi: ["tang trống"], en: ["wooden rim", "tang trống"] },
      def: { vi: "Phần thân bằng gỗ của trống, bao quanh mặt da. Gõ vào tang ra tiếng “cắc” khô, gõ vào mặt da ra tiếng “tùng”.",
             en: "The wooden body of the drum around the skin. Striking it gives a dry “cắc”, striking the skin gives a deep “tùng”." } },
    { id: "song-lang", group: "parts", see: { recording: "tai-tu", genres: ["cai-luong"] },
      term: { vi: "Song lang", en: "Song lang" },
      match: { vi: ["song lang"], en: ["song lang"] },
      def: { vi: "Nhạc cụ gõ nhỏ bằng gỗ, người đờn gõ bằng chân để giữ nhịp trong đờn ca tài tử và cải lương.",
             en: "A small wooden percussion instrument that a musician strikes with the foot to keep time in đờn ca tài tử and cải lương." } },
    { id: "ngu-cung", group: "sound", see: { scales: true, try: "dan-tranh" },
      term: { vi: "Ngũ cung (thang năm âm)", en: "Pentatonic scale" },
      match: { vi: ["ngũ cung", "năm cung", "thang năm âm"], en: ["pentatonic", "five-note scale"] },
      def: { vi: "Thang âm có năm nốt trong một quãng tám. Nhiều làn điệu dân ca Việt Nam dựa trên thang năm âm. Có thể nghe so sánh ở phần “Năm âm và bảy âm” của trang Nhạc cụ.",
             en: "A scale with five notes in an octave. Many Vietnamese folk melodies are built on it. You can compare it by ear in the “Five notes and seven notes” section of the Instruments page." } },
    { id: "ca-nuong", group: "performance", see: { recording: "ca-tru" },
      term: { vi: "Ca nương (đào nương)", en: "Ca nương" },
      match: { vi: ["ca nương", "đào nương"], en: ["ca nương", "đào nương"] },
      def: { vi: "Người nữ hát trong ca trù, vừa hát vừa gõ phách. Cùng biểu diễn có kép đàn chơi đàn đáy và quan viên đánh trống chầu.",
             en: "The female singer in ca trù, who sings while striking the phách. She performs with a đàn đáy lute player and a listener who beats the praise drum." } },
    { id: "cam-chau", group: "performance", see: { recording: "ca-tru" },
      term: { vi: "Cầm chầu", en: "Cầm chầu" },
      match: { vi: ["cầm chầu"], en: ["cầm chầu"] },
      def: { vi: "Đánh trống chầu khi nghe ca trù. Tiếng trống vừa giữ nhịp vừa để khen hay chê câu hát, nên người cầm chầu phải là người am hiểu.",
             en: "Beating the praise drum while listening to ca trù. The drum keeps time and also praises or criticises the singing, so the drummer must be a knowledgeable listener." } },
    { id: "hat-cua-dinh", group: "performance", see: { recording: "ca-tru", history: "le" },
      term: { vi: "Hát cửa đình", en: "Hát cửa đình" },
      match: { vi: ["hát cửa đình"], en: ["hát cửa đình"] },
      def: { vi: "Hát ca trù ở đình làng trong dịp lễ hội để thờ thần. Văn bia từ thế kỷ 17 còn ghi lại việc mua bán quyền hát cửa đình.",
             en: "Ca trù singing at the village communal house during festivals, as an offering to the village deity. Inscriptions from the 17th century record the buying and selling of this right to sing." } },
    { id: "lien-anh", group: "performance", see: { recording: "quan-ho" },
      term: { vi: "Liền anh, liền chị", en: "Liền anh, liền chị" },
      match: { vi: ["liền anh", "liền chị"], en: ["liền anh", "liền chị"] },
      def: { vi: "Cách gọi những người nam và nữ hát quan họ. Họ hát đối đáp theo từng cặp giữa các nhóm của những làng kết nghĩa với nhau.",
             en: "The names for the men and women who sing quan họ. They answer each other in pairs, between groups from villages bound by a traditional friendship." } },
    { id: "ca-ra-bo", group: "performance", see: { recording: "cai-luong", genres: ["tai-tu"], history: "tai-tu-cai-luong" },
      term: { vi: "Ca ra bộ", en: "Ca ra bộ" },
      match: { vi: ["ca ra bộ"], en: ["ca ra bộ"] },
      def: { vi: "Lối vừa ca vừa làm điệu bộ diễn tả nội dung bài, xuất hiện ở Nam Bộ đầu thế kỷ 20. Đây là bước chuyển từ đờn ca tài tử sang sân khấu cải lương.",
             en: "Singing with acted gestures that show the meaning of the song, which appeared in southern Vietnam in the early 20th century. It was the step from đờn ca tài tử to cải lương theatre." } },
    { id: "bai-to", group: "performance", see: { recording: "tai-tu" },
      term: { vi: "Bài tổ", en: "Bài tổ" },
      match: { vi: ["bài tổ"], en: ["bài tổ"] },
      def: { vi: "20 bài bản gốc của đờn ca tài tử, chia thành bốn nhóm: 6 bài Bắc, 3 bài Nam, 4 bài Oán và 7 bài lớn.",
             en: "The 20 core pieces of đờn ca tài tử, in four groups: 6 Bắc pieces, 3 Nam pieces, 4 Oán pieces and the 7 great pieces." } },
    { id: "vong-co", group: "performance", see: { recording: "cai-luong", history: "tai-tu-cai-luong" },
      term: { vi: "Vọng cổ", en: "Vọng cổ" },
      match: { vi: ["vọng cổ"], en: ["vọng cổ"] },
      def: { vi: "Bài bản phát triển từ bài Dạ cổ hoài lang của Cao Văn Lầu (nhiều nguồn ghi năm 1919), về sau là bài quan trọng bậc nhất của cải lương.",
             en: "A melody that grew out of Cao Văn Lầu's Dạ cổ hoài lang (dated 1919 by most sources) and became the most important piece in cải lương." } },
    { id: "kiet-tac", group: "unesco", see: { genres: ["nha-nhac", "cong-chieng"], history: "unesco" },
      term: { vi: "Kiệt tác (UNESCO)", en: "Masterpiece (UNESCO)" },
      match: { vi: ["kiệt tác"], en: ["masterpiece"] },
      def: { vi: "Danh hiệu “Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại” UNESCO công bố trong các năm 2001, 2003 và 2005. Năm 2008 các kiệt tác được đưa vào Danh sách đại diện.",
             en: "The title “Masterpiece of the Oral and Intangible Heritage of Humanity”, proclaimed by UNESCO in 2001, 2003 and 2005. In 2008 the Masterpieces were incorporated into the Representative List." } },
    { id: "ds-dai-dien", group: "unesco", see: { unescoList: true, history: "unesco" },
      term: { vi: "Danh sách đại diện", en: "Representative List" },
      match: { vi: ["danh sách đại diện", "danh sách di sản văn hóa phi vật thể đại diện"], en: ["representative list"] },
      def: { vi: "Danh sách di sản văn hóa phi vật thể đại diện của nhân loại, lập theo Công ước năm 2003 của UNESCO về bảo vệ di sản văn hóa phi vật thể.",
             en: "The Representative List of the Intangible Cultural Heritage of Humanity, set up under UNESCO's 2003 Convention for the Safeguarding of the Intangible Cultural Heritage." } },
    { id: "ds-khan-cap", group: "unesco", see: { genres: ["ca-tru", "hat-xoan"], history: "unesco" },
      term: { vi: "Danh sách cần bảo vệ khẩn cấp", en: "Urgent Safeguarding List" },
      match: { vi: ["cần bảo vệ khẩn cấp"], en: ["urgent safeguarding"] },
      def: { vi: "Danh sách của UNESCO dành cho di sản đang có nguy cơ mai một, cần kế hoạch bảo vệ ngay. Ca trù vào danh sách này năm 2009, hát xoan năm 2011.",
             en: "UNESCO's list for heritage at risk of disappearing that needs safeguarding plans now. Ca trù was placed on it in 2009 and hát xoan in 2011." } }
  ]
};


/* ======================================================================
   PHẦN 3: ĐƯỜNG BIÊN VIỆT NAM CHO BẢN ĐỒ (ASV_MAP)
   ====================================================================== */

/* <ban-do> (scripts/build-map.cjs ghi đè đoạn giữa hai mốc này) */
/* map-data.js — Đường biên Việt Nam cho bản đồ trang Loại hình.
   Sinh tự động bởi scripts/build-map.cjs từ dữ liệu Natural Earth (public domain).
   Không sửa tay; muốn đổi thì sửa script rồi chạy lại. */
var ASV_MAP = {
  width: 610,
  height: 664,
  // Phép chiếu: x = (kinh độ − lon0) × kx ; y = (lat1 − vĩ độ) × ky
  proj: { lon0: 101.8, lat1: 23.8, kx: 38.55, ky: 40 },
  land: "M87.3 536.4L88 538.4L87.7 543L86.2 547.6L86.7 549.6L85.5 550.8L83 542.3L79.7 538.6L79 537.2L80.9 537.3L84.3 534.9L85.9 534.9L87.3 536.4ZM238 91.7L236.1 92L231.7 92.1L227.7 95.8L225 97.3L220.8 98.6L216.3 100.6L215 104.2L214.9 106.9L214.1 109.8L206.8 114.1L204.8 113.6L203.4 112L201.2 112.4L199.7 113.1L198 113L196.1 114L193.5 113.7L191.2 112.4L189.9 112L188.3 112L188 113.6L190.3 119.8L191 122.6L183.1 130.9L184 136.3L181.9 140.4L177.2 143.8L168.3 152.3L164.3 152.5L161.3 154.4L154.7 168.5L154.7 173.3L153.6 176.8L153.9 180.2L151 186.9L148 189.7L147.3 193.3L151.6 200.8L152.1 202.1L154.5 206.2L155.7 209L157.6 211.9L164.4 219.3L167.5 221.6L171.1 223.2L177.8 229.9L181.1 234.1L179.6 237.1L180.4 243.2L175.6 241.4L181.8 245.5L190.3 257.3L197.6 263.1L205.1 269.8L207.4 276.1L214.1 280.3L221.6 286.3L221.3 287.7L223.3 289.3L228.4 292.5L231.4 295.9L232.6 299.1L234.5 299.6L236.6 298.8L238.7 298.5L240.1 298.8L242.4 302.3L245.6 305.5L247.1 308.4L248.3 308L249.6 310.8L250 312.4L254.2 317.1L256.3 321.5L261.3 328.6L265 332.7L267.6 334.9L270.7 336.9L273.6 344.8L275.2 351.9L278.4 359.9L280.8 363.4L280.9 369.9L282.9 376.6L284.9 381.2L285.6 385.8L286.2 388.1L287 389.9L289.3 397.7L288.7 401.4L287.1 397.8L287.3 408.4L288.7 414L288 420.8L289.5 423.2L292.1 431L293.9 433.8L293.8 443.2L294.7 448L292.3 445.2L290.5 441.9L288.1 443.6L286 446.2L289.3 456.4L285.5 455.4L285.9 469.1L287.4 472.3L287.6 473.8L287.1 475.7L286 473.6L285.8 471.6L285.3 473.1L284 475.5L283.6 478.5L285 481.1L285.2 483L284.2 485.4L282.7 488L279.1 488.3L278.3 493.3L277 498.5L270.7 499.4L266 504L260.3 505.8L255.1 510.4L249.5 514.6L245.8 515.2L242.7 516.1L239.1 523.2L233 524L222.2 529.8L218.6 532.6L215.3 533.7L210.5 536.1L209.5 535.2L207.9 533.1L203.8 532.1L201.8 529.7L201.3 526.8L200.7 525.6L199.8 527.3L199.2 534.4L198.4 536L196.7 536.7L193.2 534.7L189.9 530.6L185.3 533.4L186.7 533.8L188.8 533.5L190.5 534.2L191.9 537L191.8 538.4L191.1 540.2L186.7 540.4L180.9 539.8L185.1 542.7L190 544.3L192.2 546L192.2 547.3L189.4 549.6L187.3 552.3L187.3 554.1L187.2 556L184.9 557.6L183.4 557.3L179.2 554.4L167.2 543.1L169 546.3L181.5 559.2L183.7 563.4L184 566.4L182.7 567.9L180.6 569.6L176.5 569.8L169.8 565L159 553.5L155.4 552L166.2 565.1L168 568.2L169.9 571.9L169.3 574.1L168.4 576.1L142.7 588.3L138.8 593.5L135.8 600L130.7 603.5L127.8 606.8L119.2 608.7L114.5 608.1L119.4 602.1L116.4 599.9L116.2 584.6L117.4 567.8L119.6 559.3L122.9 557.3L126.9 556L127 554.2L126.6 552.2L124.4 549.3L122 548L118.5 547.4L115.7 543.9L113.6 544L110.4 545.2L108.4 543.7L107.7 541.3L104.7 538.4L101.2 535.6L102.8 535.1L104.6 533.5L106.6 531.4L111.4 531.1L116.2 531.2L117.6 530.6L119.6 528.4L122.7 525.5L125.1 523.9L125.7 522.6L124.8 519.6L124.2 516.5L125.1 515.5L129.5 516.1L134.3 517.5L135.5 518.2L138.3 514.4L140.8 513.9L145.6 513.2L150.3 512.2L152.5 512.4L154.6 515L156.3 517.5L159.5 516.6L161.5 517.9L165.7 520.1L168.2 520.2L167 515.1L168.4 511.5L165.7 508.9L157.7 502.2L156.4 500.2L156.5 497.1L156.3 492.5L155.6 489.6L155.7 487.9L156.2 486.6L157.7 486.1L159.1 485.9L160.2 484.7L162.1 481.7L165.9 481.9L171.1 483.7L175 484.7L177.3 484.5L177.7 482.5L178 475.5L177.9 474.1L181.2 473.4L186.2 473.2L188.9 472.8L191.4 469.9L197.8 468.9L202.4 465L206.6 460.9L208.6 459.8L211.2 459.1L213.2 459.2L215.6 461.6L217.7 460.2L220 457.4L221.2 454.7L221.9 450.4L221.4 443.8L220.2 438.6L219 434.7L218.8 430.8L221.5 423L223.8 414.5L223.4 411.1L220.8 405.8L218.3 399.4L215.5 392.3L214.4 391.2L213.7 389.2L213.2 386.9L214.4 379.7L214.5 377.3L217.7 374L219.5 370.2L221.1 366L220.5 363.8L220.3 359.3L220.7 357.1L219.9 355.4L219 352.8L219.6 351.1L221.9 349.7L223.2 347.3L224.9 344.4L225.6 341.8L224.4 339.6L222.2 336.3L218.2 333.4L213.5 329.6L211.2 327.3L209.4 324.9L207.8 322.1L206.9 319.9L207.7 318.5L214.4 315.1L215.6 313.9L216.3 312.1L215.7 310.3L214 309.3L211.9 308.6L208.8 306.5L203.1 300.8L200.5 299.5L197.8 297.9L196.3 296.1L194.7 291.4L192.4 292.4L190.4 293.9L188.7 293.6L187.2 292.3L186.5 290.5L184.8 288L183 286L182.5 279.2L182.2 276.9L181.3 273.8L179.8 272.7L178.3 271.9L174.8 266.3L172.3 263.3L162.2 255.4L160.9 254.1L158.2 250.9L153.4 246.2L150 242.5L147.5 238.6L146.4 235.3L146 232.7L143.4 228.9L141 225.8L138.8 224.8L136.2 224.4L133.9 222.6L129.7 218.5L127.8 215.8L126.7 214L126.7 212.2L127.7 209.1L129 207.3L129 206L127.8 204.8L123.1 202.9L112.4 199.9L108.5 197.6L104.8 194.6L102 192.6L89 184.2L85.1 182.8L81.7 181.3L80.6 179.8L80.8 178.4L82.2 177.4L85.9 175.2L87.2 172.7L86.8 169.4L85.3 166.1L86 165L87.2 164.9L89.7 164.8L94.8 164.6L105.9 167.6L107.5 167.3L113.5 161.8L115.7 158.6L116.2 155.8L117.4 154.1L120.6 151.3L120.6 148.7L119.1 145.2L117.5 143.9L116.1 143.3L111.7 143.8L110.3 140.4L110.1 138.9L108.7 137L103.9 135.5L99.9 135L100.5 132.6L103.3 130.8L105.3 129.8L107 128L107.3 126.1L105.3 124.5L102.6 122.7L98.3 119.2L92.3 115.4L88.7 114.2L86.8 114.4L80.3 117.5L76.7 119.6L73.8 123.3L70.7 124.1L67.6 122.5L64.1 120.8L54.4 118.4L50.3 116.3L41.8 103.9L40.5 101.4L41.3 98.5L41.9 94.4L42.8 91.7L44.3 89.2L44.7 87L44.3 84.7L43.1 83.5L41.5 83.1L40.3 82.6L39.2 79.7L37.4 83.6L36.2 84.9L34.5 85.5L33.2 85L32.4 83.5L32 81.1L31.2 77.9L30.2 75.8L26.5 73.7L24.8 70.9L19.3 64.9L14.8 60.6L12.6 56.8L14.5 55.4L16.8 53.4L19.4 50.2L22.2 46.1L23.4 43.7L24.2 42.7L25.9 42L27.6 42.4L30.8 44L35.5 46.1L39.7 48.5L41.4 51L43.8 53.4L45.6 54.1L49.2 52.1L51.5 50.3L51.6 48.3L53.7 46.5L56.5 43.5L57.8 41.4L60 41.8L64.4 48.1L66.5 47.5L68.3 42.6L70.2 40.7L81.5 50.5L83.7 50L84.5 48.6L85.3 45.3L86.9 41.9L90.3 40L93 39.6L94 41.3L96.3 43.5L99.1 43.8L105.1 39.8L107.1 39.2L109.2 39.3L111.3 39.1L113.3 37.6L115.5 35.6L116.2 31.6L116.7 28L118.1 26.5L119.9 25.6L123.2 24.2L130.6 20.8L132.6 19.1L134 18.2L136.9 19.7L140.3 22.6L142.4 24.8L143.8 27.1L144.5 29.1L150 30.8L153.5 33.2L155.9 35.1L158.2 35L160.5 34.5L161.9 33L164.5 33L167.6 33.2L169 33.8L171.5 37.2L172.7 37.7L174.9 37.5L179.3 36.2L182.8 35.7L186 37L192 40.8L190.3 43.6L189 46.5L186.3 48.6L184.4 49.1L183.1 51.9L182.6 56.2L183.3 58.3L184.8 59L186.4 60.5L187.1 62.3L187.4 66.5L187.3 71.3L187.5 72.8L188.8 72.6L190 72L192.5 72.7L195.6 73.9L197.6 75.2L199.3 75L200.7 76.3L201.2 78.6L202.8 80.2L207.3 83.3L210.9 83.6L214 87.6L217.2 86.3L218.6 88.1L225.2 87.4L229.7 85.8L231.4 86.2L235.5 89.6L238 91.7ZM185.7 604.7L183.8 604L187.3 601.3L186.9 603.1L185.7 604.7ZM206.9 536.1L203.7 538.5L203.5 536.5L206.3 535.2L207.3 534.2L206.9 536.1ZM195.3 119.4L192.9 118.3L191.6 117.4L192.6 114.9L194.9 117.7L195.3 119.4ZM223.7 103.3L218.1 108.3L216 108.3L217.9 102.6L218.8 101.2L222.2 103.2L223.7 103.3ZM220.6 114.9L218.4 116L215.8 115.9L218.9 113.9L220.5 111.5L221.7 110.6L221.7 112.8L220.6 114.9ZM201.7 122.1L200.1 122.3L197 119L198.7 117.3L202.1 118.5L202.9 120L202.1 121.6Z",
  hoangSa: [[377.8,292],[383.6,290],[404.8,278],[393.2,274],[362.4,294],[373.9,312],[381.6,302]],
  truongSa: [[390.1,536],[424.1,508],[481.9,494],[474.2,516],[464.5,544],[481.9,556],[508.9,524],[427.9,592],[454.9,600],[489.6,608],[404.8,564],[528.1,560],[390.1,606]]
};
/* </ban-do> */


/* ======================================================================
   PHẦN 4: PHẦN DÙNG CHUNG: MENU, CHÂN TRANG, TRÌNH PHÁT ÂM THANH (ASV)
   ====================================================================== */

/* common.js: Phần dùng chung cho mọi trang
   1. Danh sách trang + đánh dấu trang nào đã làm xong
   2. Tiện ích nhỏ (escape, lưu trữ an toàn)
   3. Biểu tượng SVG + biểu tượng đàn bầu (logo, dải phân cách, cây đàn ở hero)
   4. Navbar, footer, khối "Xem tiếp"
   5. Thông báo "Sẽ có trong bản hoàn chỉnh"
   6. Âm thanh: thử file thật → thiếu file thì tổng hợp bằng Web Audio
   7. Ảnh có ô giữ chỗ khi chưa có file
   8. Thẻ video biểu diễn (YouTube của UNESCO)
   Thứ tự nạp: i18n.js → data.js → common.js → <trang>.js */

var ASV = window.ASV || {};

/* Danh sách trang
   ready: false → link tới trang đó hiện thông báo thay vì dẫn tới trang lỗi.
   Làm xong trang nào thì đổi ready thành true. */
ASV.PAGES = [
  { id: "home",        href: "HomePage.html",    icon: "home",     ready: true },
  { id: "genres",      href: "genres.html",      icon: "map",      ready: true },
  { id: "instruments", href: "instruments.html", icon: "lute",     ready: true },
  { id: "history",     href: "history.html",     icon: "timeline", ready: true },
  { id: "glossary",    href: "glossary.html",    icon: "book",     ready: true }
];

/* Tiện ích */
ASV.escape = function (str) {
  return String(str === undefined || str === null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

// Hiện chữ từ data.js; tô vàng các chỗ [CẦN KIỂM CHỨNG] nếu bật showVerifyMarks
ASV.renderText = function (value) {
  var html = ASV.escape(I18n.pick(value));
  var show = window.ASV_DATA && ASV_DATA.showVerifyMarks;
  return html.replace(/\s*\[(CẦN KIỂM CHỨNG|CAN KIEM CHUNG)[^\]]*\]/g, function (m) {
    return show ? ' <mark class="verify">' + m.trim() + "</mark>" : "";
  });
};

// localStorage có thể bị chặn (chế độ riêng tư, file://) → luôn bọc try/catch
ASV.storage = {
  get: function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }
};

ASV.findPage = function (href) {
  if (!href) return null;
  var file = href.split("#")[0].split("?")[0].split("/").pop();
  for (var i = 0; i < ASV.PAGES.length; i++) {
    if (ASV.PAGES[i].href === file) return ASV.PAGES[i];
  }
  return null;
};

/* Biểu tượng SVG (không dùng emoji) */
ASV.ICONS = {
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="1" fill="currentColor" stroke="none"/>',
  map: '<path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  lute: '<circle cx="9" cy="15" r="5"/><path d="M12.6 11.4L19 5M17.5 3.5l3 3M8 15.5l2-2"/>',
  timeline: '<path d="M7 3v18"/><circle cx="7" cy="6" r="2" fill="currentColor"/><circle cx="7" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="18" r="2" fill="currentColor"/><path d="M11 6h9M11 12h6M11 18h8"/>',
  ear: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  home: '<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
  book: '<path d="M4 5.5c2.7-1 5.3-1 8 .8 2.7-1.8 5.3-1.8 8-.8v13c-2.7-1-5.3-1-8 .8-2.7-1.8-5.3-1.8-8-.8z"/><path d="M12 6.3v13"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  shuffle: '<path d="M3 7h3.5c4 0 6 10 10 10H21M3 17h3.5c1.6 0 2.8-1.6 3.9-3.6M14 9.6C15 8 16 7 17.5 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  down: '<path d="M12 4v15M6 13l6 6 6-6"/>'
};

ASV.icon = function (name, extraClass) {
  return '<svg class="icon ' + (extraClass || "") + '" viewBox="0 0 24 24" width="24" height="24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    (ASV.ICONS[name] || "") + "</svg>";
};

/* Biểu tượng đàn bầu
   Biểu tượng của site là cây đàn bầu (đàn một dây, đặc trưng của Việt Nam)
   đặt trong con dấu đỏ son, giống con dấu trên các bức tranh ở trang chủ.
   Dùng cho: logo, dải phân cách, biểu tượng tải, cây đàn lớn ở hero. */
ASV.Motif = (function () {
  var uid = 0;

  // Tọa độ dây đàn ở hero (viewBox 1000×180): S = điểm buộc trên cần đàn, P = trục lên dây
  var BAU = { sx: 64, sy: 34, px: 948, py: 108 };

  // Logo: con dấu đỏ son, bên trong là đàn bầu cách điệu (thân, cần, bầu, dây)
  function logo() {
    return '<svg class="mt-svg mt-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<rect class="mt-seal" x="2" y="2" width="60" height="60" rx="6"/>' +
      '<rect class="mt-seal-line" x="6.5" y="6.5" width="51" height="51" rx="3"/>' +
      '<path class="mt-paper" d="M11 45 L54 42 L54 47.5 L11 50.5 Z"/>' +
      '<path class="mt-paper-line" d="M18.5 45 C17.5 34 16.5 24 15.5 12.5"/>' +
      '<circle class="mt-paper" cx="18.2" cy="38.5" r="4.8"/>' +
      '<path class="mt-paper-thin" d="M16 18.5 L52 42.3"/>' +
      "</svg>";
  }

  // Biểu tượng tải: một sợi dây đang rung
  function loader() {
    return '<svg class="mt-svg mt-loader" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path class="mt-wave" d="M2 12 Q7 4 12 12 T22 12"/></svg>';
  }

  // Dải phân cách: dây đàn có các điểm nút, con dấu ở giữa
  function divider() {
    var id = "mtband" + (++uid);
    var band = '<svg class="mt-band" aria-hidden="true" focusable="false" preserveAspectRatio="none">' +
      '<defs><pattern id="' + id + '" width="26" height="14" patternUnits="userSpaceOnUse">' +
      '<line class="mt-line" x1="0" y1="7" x2="26" y2="7"/><circle class="mt-dot" cx="13" cy="7" r="2"/>' +
      '</pattern></defs><rect width="100%" height="14" fill="url(#' + id + ')"/></svg>';
    return band + '<span class="mt-divider-mark">' + logo() + "</span>" + band;
  }

  // Cây đàn bầu lớn nằm ngang dưới bình phong tranh (trang chủ)
  function danBau() {
    var nodes = "";
    // Đánh dấu các điểm nút bồi âm (1/2, 1/3 … 1/8 chiều dài dây, tính từ trục lên dây)
    for (var n = 2; n <= 8; n++) {
      var x = BAU.px - (BAU.px - BAU.sx) / n;
      var y = 121 - (10 * (x - 26)) / 950 + 3; // nằm trên mặt đàn
      nodes += '<path class="bau-node" d="M' + x.toFixed(1) + " " + (y - 3.5).toFixed(1) + " l3.5 3.5 l-3.5 3.5 l-3.5 -3.5z\"/>";
    }
    var line = "M" + BAU.sx + " " + BAU.sy + " L" + BAU.px + " " + BAU.py;
    return '<svg class="bau-svg" viewBox="0 0 1000 180" aria-hidden="true" focusable="false">' +
      // Thân đàn (hộp gỗ dài) và mặt đàn
      '<path class="bau-body" d="M26 121 L976 111 L976 133 Q976 142 966 142 L36 151 Q26 151 26 142 Z"/>' +
      '<path class="bau-top" d="M26 121 L976 111 L976 118 L26 129 Z"/>' +
      '<path class="bau-inlay" d="M70 140 L930 131.5"/>' +
      nodes +
      // Cần đàn (vòi) bằng sừng và bầu cộng hưởng
      '<path class="bau-rod-out" d="M80 122 C76 86 68 54 62 18"/>' +
      '<path class="bau-rod" d="M80 122 C76 86 68 54 62 18"/>' +
      '<circle class="bau-knob" cx="62" cy="17" r="4.5"/>' +
      '<ellipse class="bau-gourd" cx="78" cy="101" rx="17" ry="15"/>' +
      '<ellipse class="bau-gourd" cx="75" cy="80" rx="9" ry="8"/>' +
      // Trục lên dây ở đầu kia
      '<rect class="bau-peg" x="942" y="97" width="14" height="22" rx="3"/>' +
      '<path class="bau-crank" d="M956 103 h16 v-8"/>' +
      // Dây đàn: lớp viền sáng + dây; điểm chạm của bàn tay
      '<path class="bau-string-halo" d="' + line + '"/>' +
      '<path class="bau-string" d="' + line + '"/>' +
      '<circle class="bau-touch" r="10" cx="0" cy="0"/>' +
      "</svg>";
  }

  return { BAU: BAU, logo: logo, loader: loader, divider: divider, danBau: danBau };
})();

// Điền họa tiết vào các chỗ đánh dấu data-motif="logo|loader|danBau", data-divider, data-icon
ASV.fillMotifs = function (root) {
  root = root || document;
  root.querySelectorAll("[data-motif]").forEach(function (el) {
    var kind = el.getAttribute("data-motif");
    if (ASV.Motif[kind]) el.innerHTML = ASV.Motif[kind]();
  });
  root.querySelectorAll("[data-divider]").forEach(function (el) {
    el.classList.add("mt-divider");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = ASV.Motif.divider();
  });
  root.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = ASV.icon(el.getAttribute("data-icon"));
  });
};

/* Navbar, footer, "Xem tiếp" */
ASV.renderHeader = function () {
  var host = document.getElementById("site-header");
  if (!host) return;
  var current = document.body.getAttribute("data-page");

  var links = ASV.PAGES.map(function (p) {
    var active = p.id === current;
    return '<li class="nav-item"><a class="nav-link' + (active ? " active" : "") + '" href="' + p.href + '"' +
      (active ? ' aria-current="page"' : "") + ' data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<a class="skip-link" href="#main" data-i18n="skip">' + I18n.t("skip") + "</a>" +
    '<header class="site-header">' +
      '<nav class="navbar navbar-expand-lg site-nav" data-i18n-aria-label="nav.label" aria-label="' + I18n.t("nav.label") + '">' +
        '<div class="container">' +
          '<a class="navbar-brand brand" href="HomePage.html">' + ASV.Motif.logo() +
            '<span class="brand-name" data-i18n="site.name">' + I18n.t("site.name") + "</span></a>" +
          '<div class="lang-switch order-lg-last" role="group" data-i18n-aria-label="lang.group" aria-label="' + I18n.t("lang.group") + '">' +
            '<button type="button" class="lang-btn" data-lang="vi" lang="vi" data-i18n-title="lang.vi" title="Tiếng Việt">VI</button>' +
            '<button type="button" class="lang-btn" data-lang="en" lang="en" data-i18n-title="lang.en" title="English">EN</button>' +
          "</div>" +
          '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#asvNav" aria-controls="asvNav" ' +
            'aria-expanded="false" data-i18n-aria-label="nav.toggle" aria-label="' + I18n.t("nav.toggle") + '">' +
            '<span class="navbar-toggler-icon"></span></button>' +
          '<div class="collapse navbar-collapse" id="asvNav"><ul class="navbar-nav ms-lg-auto me-lg-3">' + links + "</ul></div>" +
        "</div>" +
      "</nav>" +
    "</header>";

  ASV.syncLangButtons();

  // Dự phòng: nếu chưa có Bootstrap JS thì tự bật/tắt menu trên di động
  if (!window.bootstrap) {
    var toggler = host.querySelector(".navbar-toggler");
    var menu = host.querySelector("#asvNav");
    toggler.addEventListener("click", function () {
      var open = menu.classList.toggle("show");
      toggler.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
};

// Nút VI/EN ở bất kỳ đâu (navbar, màn hình chào) dùng chung một bộ lắng nghe
document.addEventListener("click", function (e) {
  var btn = e.target.closest(".lang-btn[data-lang]");
  if (btn) I18n.set(btn.getAttribute("data-lang"));
});

ASV.syncLangButtons = function () {
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    var on = btn.getAttribute("data-lang") === I18n.lang;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.classList.toggle("is-active", on);
  });
};

ASV.renderFooter = function () {
  var host = document.getElementById("site-footer");
  if (!host) return;
  var links = ASV.PAGES.map(function (p) {
    return '<li><a href="' + p.href + '" data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<p class="footer-brand">' + ASV.Motif.logo() + '<span data-i18n="site.name">' + I18n.t("site.name") + "</span></p>" +
            '<p data-i18n="site.tagline">' + I18n.t("site.tagline") + "</p>" +
            '<p class="footer-small" data-i18n="footer.aboutText">' + I18n.t("footer.aboutText") + "</p>" +
          "</div>" +
          '<div class="col-6 col-md-3">' +
            '<h2 class="footer-title" data-i18n="footer.explore">' + I18n.t("footer.explore") + "</h2>" +
            '<ul class="footer-links">' + links + "</ul>" +
          "</div>" +
          '<div class="col-12 col-md-4">' +
            '<details class="footer-sources"><summary class="footer-title" data-i18n="footer.about">' + I18n.t("footer.about") + "</summary>" +
            '<p class="footer-small" data-i18n="footer.synthNote">' + I18n.t("footer.synthNote") + "</p>" +
            '<p class="footer-small" data-i18n="footer.motif">' + I18n.t("footer.motif") + "</p>" +
            '<p class="footer-small" data-i18n="footer.videoNote">' + I18n.t("footer.videoNote") + "</p>" + "</details>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.copy">' + I18n.t("footer.copy") + "</span>" +
          '<a href="#top" data-i18n="footer.top">' + I18n.t("footer.top") + "</a>" +
        "</div>" +
      "</div>" +
    "</footer>";
};

// Khối "Xem tiếp": <section id="explore-next" data-next="genres,history">
ASV.renderNext = function () {
  var host = document.getElementById("explore-next");
  if (!host) return;
  var ids = (host.getAttribute("data-next") || "").split(",");
  var cards = ids.map(function (id) {
    var p = ASV.PAGES.filter(function (x) { return x.id === id.trim(); })[0];
    if (!p) return "";
    return '<div class="col-md-6"><a class="next-card" href="' + p.href + '">' +
      '<span class="next-text"><span class="next-title" data-i18n="page.' + p.id + '.title"></span>' +
      '<span class="next-desc" data-i18n="page.' + p.id + '.desc"></span></span>' +
      "</a></div>";
  }).join("");

  host.classList.add("explore-next");
  host.setAttribute("aria-labelledby", "explore-next-title");
  host.innerHTML = '<div class="container"><div data-divider></div>' +
    '<h2 class="section-title text-center" id="explore-next-title" data-i18n="next.title"></h2>' +
    '<div class="row g-3 justify-content-center">' + cards + "</div></div>";
};

/* Thông báo "sẽ có trong bản hoàn chỉnh" */
ASV.toast = (function () {
  var box, timer;
  function ensure() {
    if (box) return box;
    box = document.createElement("div");
    box.className = "asv-toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
    box.addEventListener("click", function () { box.classList.remove("is-visible"); });
    return box;
  }
  return function (message) {
    var el = ensure();
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(function () { el.classList.remove("is-visible"); }, 3500);
  };
})();

// Bắt mọi cú bấm vào link tới trang chưa làm hoặc phần tử có data-coming-soon
document.addEventListener("click", function (e) {
  var soon = e.target.closest("[data-coming-soon]");
  if (soon) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon"));
    return;
  }
  var link = e.target.closest("a[href]");
  if (!link) return;
  var page = ASV.findPage(link.getAttribute("href"));
  if (page && !page.ready) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon.page", { page: I18n.t("nav." + page.id) }));
  }
});

/* Âm thanh tổng hợp (Web Audio)
   Dùng khi chưa có file ghi âm. Mỗi preset là một câu nhạc ngắn gợi tả
   âm sắc nhạc cụ; trả về độ dài (giây). Chỉ là minh họa, không phải bản thu. */
ASV.Synth = (function () {
  var ctx = null, noiseBuf = null;

  function getCtx() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Tên nốt → tần số (A4 = 440 Hz)
  function hz(name) {
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
    var base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    var midi = (Number(m[3]) + 1) * 12 + base + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function noise() {
    if (!noiseBuf) {
      var len = ctx.sampleRate * 2;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    return src;
  }

  function filter(type, freq, q, gain) {
    var f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q;
    if (gain !== undefined) f.gain.value = gain;
    return f;
  }

  // Tiếng gảy (đàn tranh, nguyệt, tỳ bà…): tắt dần, có thể nhấn nhá (bend)
  function pluck(out, t, f, o) {
    o = o || {};
    var d = o.decay || 1;
    var osc = ctx.createOscillator();
    osc.type = o.type || "triangle";
    osc.frequency.setValueAtTime(f, t);
    if (o.bendTo) {
      var bt = t + (o.bendAt || 0.25);
      osc.frequency.setValueAtTime(f, bt);
      osc.frequency.exponentialRampToValueAtTime(o.bendTo, bt + 0.18);
    }
    var lp = filter("lowpass", o.cutoff || 3000, 0.7);
    lp.frequency.setValueAtTime(o.cutoff || 3000, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(250, (o.cutoff || 3000) * 0.25), t + d);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.3, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + d + 0.05);
  }

  // Lên xuống cao độ liền mạch theo chuỗi nốt [[tên nốt, thời điểm], …]
  function glideFreq(param, seq, t, glide, mult) {
    var prev = hz(seq[0][0]) * mult;
    param.setValueAtTime(prev, t);
    for (var i = 1; i < seq.length; i++) {
      var f = hz(seq[i][0]) * mult, at = t + seq[i][1];
      param.setValueAtTime(prev, at - glide);
      param.exponentialRampToValueAtTime(f, at);
      prev = f;
    }
  }

  // Âm ngân liên tục (đàn nhị, sáo, kèn, giọng hát…)
  function sustained(out, t, seq, end, o) {
    var glide = o.glide || 0.08, level = o.level || 0.3;
    var g = ctx.createGain();
    var nodes = [];

    // Bao âm: gảy (pluckAt) hoặc thổi/kéo (attack)
    g.gain.setValueAtTime(0, t);
    if (o.pluckAt) {
      o.pluckAt.forEach(function (p) {
        g.gain.setTargetAtTime(level, t + p, 0.004);
        g.gain.setTargetAtTime(level * (o.decayTo || 0.4), t + p + 0.03, 0.6);
      });
    } else {
      g.gain.setTargetAtTime(level, t, (o.attack || 0.08) / 3);
    }
    g.gain.setTargetAtTime(0, t + end - 0.35, 0.1);

    // Rung (vibrato) bắt đầu muộn một chút như người chơi thật
    var lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
    var vib = o.vib || [5, 0.01];
    lfo.frequency.value = vib[0];
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(hz(seq[0][0]) * vib[1], t + (o.vibDelay || 0.45));
    lfo.connect(lfoGain);
    nodes.push(lfo);

    // Dao động chính + bồi âm (harmonics)
    var partials = o.partials || [[1, 1]];
    var mix = ctx.createGain();
    partials.forEach(function (p) {
      var osc = ctx.createOscillator();
      osc.type = p[2] || o.type || "sawtooth";
      glideFreq(osc.frequency, seq, t, glide, p[0]);
      lfoGain.connect(osc.frequency);
      var pg = ctx.createGain();
      pg.gain.value = p[1];
      osc.connect(pg); pg.connect(mix);
      nodes.push(osc);
    });

    // Chuỗi lọc nối tiếp
    var last = mix;
    (o.filters || []).forEach(function (f) {
      var node = filter(f[0], f[1], f[2], f[3]);
      last.connect(node);
      last = node;
    });

    // Formant song song (giả giọng hát)
    if (o.formants) {
      var sum = ctx.createGain();
      o.formants.forEach(function (fm) {
        var bp = filter("bandpass", fm[0], fm[1]);
        var fg = ctx.createGain();
        fg.gain.value = fm[2];
        last.connect(bp); bp.connect(fg); fg.connect(sum);
      });
      last = sum;
    }
    last.connect(g);

    // Tiếng hơi thở (sáo)
    if (o.breath) {
      var n = noise(), bp2 = filter("bandpass", o.breathFreq || 2500, 1), ng = ctx.createGain();
      ng.gain.value = o.breath;
      n.connect(bp2); bp2.connect(ng); ng.connect(g);
      nodes.push(n);
    }

    g.connect(out);
    nodes.forEach(function (node) { node.start(t); node.stop(t + end + 0.1); });
    return end;
  }

  // Tiếng đánh (trống): cao độ tụt nhanh + tiếng "bụp" của nhiễu
  function hit(out, t, o) {
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(o.f0, t);
    osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.drop || 0.12));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.8, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (o.decay || 0.6));
    osc.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + (o.decay || 0.6) + 0.05);
    if (o.noise) {
      var n = noise(), f = filter(o.noise[0], o.noise[1], o.noise[4] || 0.8), ng = ctx.createGain();
      ng.gain.setValueAtTime(o.noise[2], t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + o.noise[3]);
      n.connect(f); f.connect(ng); ng.connect(out);
      n.start(t); n.stop(t + o.noise[3] + 0.05);
    }
  }

  // Tiếng kim loại (cồng chiêng): nhiều âm bồi không đều, ngân lâu
  function bell(out, t, f, o) {
    o = o || {};
    var parts = o.partials || [[1, 1, 1], [1.48, 0.45, 0.6], [2.02, 0.3, 0.5], [2.74, 0.18, 0.35], [3.3, 0.1, 0.25]];
    var decay = o.decay || 2.6, gain = o.gain || 0.25;
    parts.forEach(function (p, i) {
      [0, i === 0 ? 1.3 : 0].forEach(function (detune, k) {
        if (k === 1 && !detune) return;
        var osc = ctx.createOscillator(), g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f * p[0] + detune;
        var d = decay * p[2];
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain * p[1] * (k ? 0.5 : 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        osc.connect(g); g.connect(out);
        osc.start(t); osc.stop(t + d + 0.05);
      });
    });
    hit(out, t, { f0: f * 0.8, f1: f * 0.6, gain: 0.0002, decay: 0.05, noise: ["lowpass", 700, 0.12, 0.09] });
  }


  // Thư viện preset: tên trong data.js → hàm tạo âm
  var PRESETS = {
    "dan-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.75], ["D5", 1.35], ["C5", 2.35], ["A4", 2.75]];
      return sustained(out, t, seq, 3.9, {
        type: "sine", level: 0.45, glide: 0.24, vib: [5.2, 0.012], vibDelay: 0.3,
        pluckAt: [0, 1.35], decayTo: 0.55,
        partials: [[1, 1, "sine"], [2, 0.12, "sine"], [3, 0.04, "sine"]]
      });
    },
    "dan-tranh": function (out, t) {
      ["D4", "F4", "G4", "A4", "C5", "D5", "C5", "A4"].forEach(function (n, i) {
        pluck(out, t + i * 0.2, hz(n), { type: "triangle", decay: 1.6, gain: 0.28, cutoff: 4200 });
        pluck(out, t + i * 0.2, hz(n) * 2, { type: "sine", decay: 0.8, gain: 0.06 });
      });
      pluck(out, t + 1.75, hz("G4"), { type: "triangle", decay: 1.9, gain: 0.3, cutoff: 4200, bendTo: hz("A4"), bendAt: 0.35 });
      return 3.7;
    },
    "dan-nguyet": function (out, t) {
      ["G3", "C4", "D4", "F4", "G4", "F4", "D4", "C4"].forEach(function (n, i) {
        var o = { type: "sawtooth", decay: 0.8, gain: 0.2, cutoff: 1900 };
        if (i === 6) { o.bendTo = hz("F4"); o.bendAt = 0.12; o.decay = 1.1; }
        pluck(out, t + i * 0.26, hz(n), o);
      });
      return 3.1;
    },
    "ty-ba": function (out, t) {
      var k;
      for (k = 0; k < 12; k++) pluck(out, t + k * 0.06, hz("A4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2600 });
      pluck(out, t + 0.9, hz("G4"), { type: "sawtooth", decay: 0.9, gain: 0.25, cutoff: 2600 });
      for (k = 0; k < 10; k++) pluck(out, t + 1.3 + k * 0.06, hz("D4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2400 });
      pluck(out, t + 2.0, hz("A3"), { type: "sawtooth", decay: 1.0, gain: 0.25, cutoff: 2200 });
      return 3.0;
    },
    "dan-nhi": function (out, t) {
      var seq = [["D4", 0], ["F4", 0.5], ["G4", 0.9], ["A4", 1.5], ["G4", 2.1], ["F4", 2.5], ["D4", 2.9]];
      return sustained(out, t, seq, 3.8, {
        type: "sawtooth", level: 0.22, attack: 0.15, glide: 0.12, vib: [5.6, 0.013],
        filters: [["lowpass", 2400, 0.7], ["peaking", 1200, 1, 6]]
      });
    },
    "sao-truc": function (out, t) {
      var seq = [["D5", 0], ["F5", 0.35], ["G5", 0.6], ["A5", 0.9], ["C6", 1.4], ["A5", 1.9], ["G5", 2.2]];
      return sustained(out, t, seq, 3.2, {
        type: "sine", level: 0.32, attack: 0.06, glide: 0.07, vib: [5, 0.01],
        partials: [[1, 1, "sine"], [2, 0.08, "sine"]], breath: 0.05, breathFreq: 3200
      });
    },
    "khen": function (out, t) {
      var o = { type: "square", level: 0.07, attack: 0.18, glide: 0.06, vib: [4, 0.003], filters: [["lowpass", 1300, 0.7]] };
      sustained(out, t, [["D4", 0]], 3.3, o);
      sustained(out, t, [["A4", 0], ["G4", 1.1], ["A4", 2.1]], 3.3, o);
      sustained(out, t, [["D5", 0], ["C5", 1.1], ["D5", 2.1]], 3.3, o);
      return 3.3;
    },
    "ken-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.45], ["D5", 0.8], ["C5", 1.4], ["A4", 1.8], ["G4", 2.2], ["A4", 2.6]];
      return sustained(out, t, seq, 3.4, {
        type: "sawtooth", level: 0.2, attack: 0.04, glide: 0.1, vib: [6, 0.014],
        filters: [["highpass", 500, 0.7], ["peaking", 1400, 1, 8], ["lowpass", 4500, 0.7]]
      });
    },
    "trong": function (out, t) {
      // "Tùng" có hai lớp: phần trầm và tiếng mặt da ~300 Hz để loa laptop, điện thoại vẫn nghe rõ
      function tung(at, g) {
        hit(out, t + at, { f0: 150, f1: 70, drop: 0.12, decay: 0.7, gain: g || 0.9, noise: ["lowpass", 400, 0.2, 0.05] });
        hit(out, t + at, { f0: 340, f1: 190, drop: 0.09, decay: 0.3, gain: (g || 0.9) * 0.36, noise: ["bandpass", 900, 0.35, 0.05, 1.2] });
      }
      function cac(at) { hit(out, t + at, { f0: 800, f1: 650, drop: 0.03, decay: 0.05, gain: 0.08, noise: ["highpass", 2000, 0.35, 0.04] }); }
      tung(0); tung(0.5); tung(1.0); cac(1.25); cac(1.375); tung(1.5); cac(1.75); tung(2.0); tung(2.25, 0.5); tung(2.5, 1);
      return 3.3;
    },
    "phach": function (out, t) {
      [0, 0.28, 0.42, 0.84, 1.12, 1.26, 1.68, 1.96, 2.1, 2.52].forEach(function (at, i) {
        hit(out, t + at, { f0: i % 2 ? 1500 : 1700, f1: 1400, drop: 0.02, decay: 0.07, gain: 0.4, noise: ["bandpass", 2400, 1.1, 0.06, 2] });
      });
      return 2.9;
    },
    "dan-trung": function (out, t) {
      function tube(at, n) {
        var f = hz(n);
        pluck(out, t + at, f, { type: "sine", decay: 0.5, gain: 0.32, cutoff: 6000 });
        pluck(out, t + at, f * 3, { type: "sine", decay: 0.12, gain: 0.05, cutoff: 8000 });
      }
      ["D5", "F5", "G5", "A5", "C6", "D6", "C6", "A5", "G5", "F5", "D5"].forEach(function (n, i) { tube(i * 0.13, n); });
      tube(1.6, "D5"); tube(1.75, "A4"); tube(1.9, "D5");
      return 2.7;
    },
    "cong-chieng": function (out, t) {
      [["G3", 0], ["A3", 0.45], ["D4", 0.9], ["G3", 1.35], ["C4", 1.6], ["A3", 1.8], ["D4", 2.25], ["G3", 2.7]].forEach(function (s) {
        bell(out, t + s[1], hz(s[0]), { decay: 2.6, gain: 0.22 });
      });
      return 5.0;
    },
    // Bồi âm đàn bầu (dùng cho cây đàn ở hero): p.freq = tần số bồi âm.
    // Dưới 200 Hz là âm thực (dây buông Đô 3): thêm bội âm 2–5 như dây thật, vì loa laptop và điện thoại
    // gần như không phát được tần số thấp này; tai vẫn nghe ra đúng nốt.
    "bau-harmonic": function (out, t, p) {
      var f = (p && p.freq) || 261.63, open = f < 200;
      var parts = open ? [[1, 1], [2, 0.6], [3, 0.45], [4, 0.25], [5, 0.12]] : [[1, 1], [2, 0.08]];
      var g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      // Rung nhẹ như khi tay trái lắc cần đàn
      lfo.frequency.value = 5.2;
      lg.gain.setValueAtTime(0, t);
      lg.gain.linearRampToValueAtTime(f * 0.008, t + 0.9);
      lfo.connect(lg);
      parts.forEach(function (q) {
        var osc = ctx.createOscillator(), pg = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f * q[0], t);
        lg.connect(osc.frequency);
        pg.gain.value = q[1];
        osc.connect(pg); pg.connect(g);
        osc.start(t); osc.stop(t + 2.5);
      });
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(open ? 0.3 : 0.5, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      g.connect(out);
      lfo.start(t); lfo.stop(t + 2.5);
      return 2.5;
    },
    // Chuỗi bồi âm đàn bầu 2, 3, 4 nối nhau (trang Thuật ngữ): p.freq = tần số âm thực
    "bau-series": function (out, t, p) {
      var f = (p && p.freq) || 130.81;
      [2, 3, 4].forEach(function (n, i) { PRESETS["bau-harmonic"](out, t + i * 0.9, { freq: f * n }); });
      return 1.8 + 2.5;
    },
  };

  // Phát một hay nhiều preset cùng lúc (params: tham số thêm, ví dụ tần số); trả về { duration, stop }
  function play(names, params) {
    var c = getCtx();
    if (!c) return null;
    var master = c.createGain();
    var comp = c.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.ratio.value = 4;
    master.gain.value = 0.8;
    master.connect(comp);
    comp.connect(c.destination);

    var t = c.currentTime + 0.05, duration = 0;
    if (typeof names === "function") {
      // Âm tự viết ở trang riêng (ví dụ đàn bầu ảo cần đổi cao độ liên tục)
      duration = names(c, master, t, params) || 0;
    } else {
      (names || []).forEach(function (n) {
        if (PRESETS[n]) duration = Math.max(duration, PRESETS[n](master, t, params));
      });
    }
    if (!duration) duration = PRESETS["trong"](master, t);

    return {
      duration: duration,
      stop: function () {
        // Giảm âm lượng thật nhanh rồi ngắt để không nghe tiếng "bụp"
        master.gain.setTargetAtTime(0, c.currentTime, 0.02);
        setTimeout(function () { master.disconnect(); comp.disconnect(); }, 200);
      }
    };
  }

  return { getCtx: getCtx, play: play, presets: Object.keys(PRESETS) };
})();

/* Trình phát chung
   item = { key, title ({vi,en} hoặc chuỗi) hoặc titleKey, src, synth: [...] hoặc hàm tự viết, params }
   Luôn chỉ phát MỘT âm thanh; bấm âm mới thì âm cũ dừng. */
ASV.Player = (function () {
  var token = 0;          // tăng mỗi lần phát → bỏ qua sự kiện của lần phát cũ
  var current = null;     // { item, status: 'loading'|'playing', source: 'file'|'synth', stop }
  var missing = {};       // nhớ file nào không tồn tại để lần sau tổng hợp ngay
  var listeners = [];

  function emit() { listeners.forEach(function (fn) { fn(current); }); }

  function titleOf(item) {
    return item.titleKey ? I18n.t(item.titleKey) : I18n.pick(item.title);
  }

  function finish(myToken) {
    if (myToken !== token || !current) return;
    current = null;
    emit();
  }

  function startSynth(item, myToken) {
    var s = ASV.Synth.play(item.synth, item.params);
    if (!s) {
      current = null;
      emit();
      ASV.toast(I18n.t("player.noAudio"));
      return;
    }
    var timer = setTimeout(function () { finish(myToken); }, s.duration * 1000 + 150);
    current = { item: item, status: "playing", source: "synth", stop: function () { clearTimeout(timer); s.stop(); } };
    emit();
    ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
  }

  function play(item) {
    stop(true);
    var myToken = ++token;
    if (ASV.closeVideos) ASV.closeVideos(); // đang xem video thì đóng lại
    ASV.Synth.getCtx(); // "mở khóa" Web Audio ngay trong cú bấm của người dùng

    if (!item.src || missing[item.src]) {
      startSynth(item, myToken);
      return;
    }

    // Thử phát file thật; lỗi (chưa có file) → chuyển sang âm tổng hợp
    var audio = new Audio();
    var fellBack = false;
    function fallback() {
      if (myToken !== token || fellBack) return;
      fellBack = true;
      missing[item.src] = true;
      startSynth(item, myToken);
    }
    current = {
      item: item, status: "loading", source: "file",
      stop: function () { audio.pause(); audio.removeAttribute("src"); }
    };
    emit();

    audio.addEventListener("error", fallback);
    audio.addEventListener("playing", function () {
      if (myToken !== token || fellBack) return;
      current.status = "playing";
      emit();
      ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
    });
    audio.addEventListener("ended", function () { finish(myToken); });
    audio.src = item.src;
    var p = audio.play();
    if (p && p.catch) p.catch(fallback);
  }

  function stop(silent) {
    if (!current) return;
    var c = current;
    current = null;
    token++;
    c.stop();
    emit();
    if (!silent) ASV.announce(I18n.t("player.stopped"));
  }

  return {
    play: play,
    stop: stop,
    titleOf: titleOf,
    get current() { return current; },
    isActive: function (key) { return !!(current && current.item.key === key); },
    onChange: function (fn) { listeners.push(fn); }
  };
})();

// Vùng đọc thông báo cho trình đọc màn hình
ASV.announce = function (msg) {
  var live = document.getElementById("asvLive");
  if (!live) return;
  live.textContent = "";
  // Chờ một chút rồi mới ghi để trình đọc màn hình đọc lại cả khi câu giống lần trước
  clearTimeout(ASV.announce.timer);
  ASV.announce.timer = setTimeout(function () { live.textContent = msg; }, 50);
};

/* Danh sách mọi thứ "nghe được": khóa → item cho trình phát.
   Khóa: "instrument:<id>". Loại hình KHÔNG có âm tổng hợp: nghe bản ghi thật qua ASV.openRecording(id). */
ASV.playables = {};
ASV.buildPlayables = function () {
  ASV_DATA.instruments.forEach(function (it) {
    ASV.playables["instrument:" + it.id] = { key: "instrument:" + it.id, title: it.name, src: it.audio, synth: it.synth };
  });
};

// HTML cho nút Nghe/Dừng; trang chỉ cần chèn chuỗi này
ASV.playButton = function (key, extraClass) {
  return '<button type="button" class="btn btn-son btn-play ' + (extraClass || "") + '" data-play="' + key + '">' +
    '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span></button>";
};

// Cập nhật mọi nút nghe theo trạng thái trình phát
ASV.syncPlayButtons = function () {
  document.querySelectorAll("[data-play]").forEach(function (btn) {
    var active = ASV.Player.isActive(btn.getAttribute("data-play"));
    btn.classList.toggle("is-playing", active);
    var label = btn.querySelector(".btn-play-label");
    var icon = btn.querySelector(".btn-play-icon");
    if (label) label.textContent = I18n.t(active ? "btn.stop" : "btn.listen");
    if (icon) icon.innerHTML = ASV.icon(active ? "stop" : "play");
  });
};

// Một bộ lắng nghe cho mọi nút data-play trên trang
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-play]");
  if (!btn) return;
  var key = btn.getAttribute("data-play");
  if (ASV.Player.isActive(key)) ASV.Player.stop();
  else if (ASV.playables[key]) ASV.Player.play(ASV.playables[key]);
});

// Esc dừng âm thanh ở bất kỳ đâu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && ASV.Player.current) ASV.Player.stop();
});

// Thanh trình phát cố định ở cuối màn hình, chỉ hiện khi đang phát
ASV.renderPlayerBar = function () {
  var bar = document.createElement("div");
  bar.className = "player-bar";
  bar.id = "asvPlayer";
  bar.hidden = true;
  bar.setAttribute("role", "region");
  bar.setAttribute("data-i18n-aria-label", "player.label");
  bar.setAttribute("aria-label", I18n.t("player.label"));
  bar.innerHTML =
    '<div class="container player-inner">' +
      '<span class="player-status" aria-hidden="true"></span>' +
      '<span class="player-text"><span class="player-title"></span><span class="player-source"></span></span>' +
      '<button type="button" class="btn btn-son btn-sm player-stop">' + ASV.icon("stop") +
        '<span data-i18n="player.stop">' + I18n.t("player.stop") + "</span></button>" +
    "</div>";
  document.body.appendChild(bar);

  var live = document.createElement("div");
  live.id = "asvLive";
  live.className = "visually-hidden";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);

  bar.querySelector(".player-stop").addEventListener("click", function () { ASV.Player.stop(); });
  ASV.Player.onChange(ASV.updatePlayerBar);
  ASV.Player.onChange(ASV.syncPlayButtons);
};

ASV.updatePlayerBar = function () {
  var bar = document.getElementById("asvPlayer");
  if (!bar) return;
  var c = ASV.Player.current;
  bar.hidden = !c;
  document.body.classList.toggle("has-player", !!c);
  if (!c) return;
  var status = bar.querySelector(".player-status");
  status.innerHTML = c.status === "loading" ? ASV.Motif.loader() : '<span class="eq"><i></i><i></i><i></i></span>';
  bar.querySelector(".player-title").textContent = ASV.Player.titleOf(c.item);
  bar.querySelector(".player-source").textContent =
    c.status === "loading" ? I18n.t("player.loading") :
    (c.source === "synth" ? I18n.t("player.synth") : I18n.t("player.recording")) + " · " + I18n.t("player.escHint");
};

/* Ảnh có ô giữ chỗ
   ASV.createMedia({ src, name, kind: "instrument"|"genre", className, alt, fallback, onFallback })
   Ảnh lỗi/chưa có → thay bằng ô giữ chỗ có con dấu đàn bầu và tên. */
ASV.createMedia = function (opts) {
  var wrap = document.createElement("div");
  wrap.className = "media-frame " + (opts.className || "");
  // Hình vẽ SVG: hiện trọn hình (không cắt như ảnh chụp)
  if (/\.svg$/i.test(opts.src || "")) wrap.classList.add("is-art");
  var altKey = opts.kind === "genre" ? "media.altGenre" : opts.kind === "history" ? "media.altHistory" : "media.altInstrument";

  function showPlaceholder() {
    wrap.classList.add("is-placeholder");
    wrap.innerHTML =
      '<div class="media-ph" role="img" aria-label="' + ASV.escape(I18n.t("media.placeholderAria", { name: opts.name })) + '">' +
        '<span class="media-ph-motif" aria-hidden="true">' + ASV.Motif.logo() + "</span>" +
        '<span class="media-ph-name" aria-hidden="true">' + ASV.escape(opts.name) + "</span>" +
        '<span class="media-ph-note" aria-hidden="true">' + ASV.escape(I18n.t("media.placeholder")) + "</span>" +
      "</div>";
  }

  if (!opts.src) { showPlaceholder(); return wrap; }
  var img = new Image();
  img.alt = opts.alt || I18n.t(altKey, { name: opts.name }); // opts.alt: mô tả riêng cho hình (nếu có)
  img.decoding = "async";
  // Ảnh lỗi: có ảnh dự phòng (opts.fallback, ví dụ tranh vẽ) thì đổi sang ảnh đó, không thì hiện ô giữ chỗ.
  // Gắn trước khi đặt src để không lỡ sự kiện.
  img.addEventListener("error", function () {
    if (opts.fallback && img.getAttribute("src") !== opts.fallback) {
      if (/\.svg$/i.test(opts.fallback)) wrap.classList.add("is-art");
      img.src = opts.fallback;
      if (opts.onFallback) opts.onFallback();
      return;
    }
    showPlaceholder();
  });
  img.src = opts.src;
  wrap.appendChild(img);
  return wrap;
};

/* Video biểu diễn (YouTube của UNESCO)
   YouTube chặn phát nhúng khi trang mở bằng file:// (lỗi 153), nên:
   - Mở bằng file://  → nút "Mở trên YouTube" (tab mới).
   - Chạy trên web (http/https, ví dụ GitHub Pages) → có thêm "Xem tại đây":
     chỉ khi bấm mới tải trình phát (không tự phát, không tải trước).
   Video không bao giờ phát cùng lúc với âm thanh của site. */
ASV.canEmbedVideo = location.protocol === "http:" || location.protocol === "https:";

// Thẻ video cho một loại hình trong ASV_DATA.genres
// opts.compact = true: bỏ tiêu đề và dòng địa điểm (khi khung bên cạnh đã có sẵn)
ASV.videoCard = function (g, opts) {
  opts = opts || {};
  var v = g.video;
  var name = I18n.pick(g.name);
  var watchUrl = "https://www.youtube.com/watch?v=" + v.youtube;
  var poster =
    '<span class="video-poster-region">' + ASV.escape(I18n.t("region." + g.region)) + "</span>" +
    '<span class="video-poster-name">' + ASV.escape(I18n.pick(g.short)) + "</span>" +
    '<span class="video-poster-play">' + ASV.icon("play") + "</span>" +
    '<span class="video-poster-seal">' + ASV.Motif.logo() + "</span>";

  // Bấm vào ảnh bìa: phát tại chỗ (nếu được) hoặc mở YouTube
  var posterEl = ASV.canEmbedVideo
    ? '<button type="button" class="video-poster" data-video-play="' + v.youtube + '" aria-label="' +
        ASV.escape(I18n.t("video.watchAria", { name: name })) + '">' + poster + "</button>"
    : '<a class="video-poster" href="' + watchUrl + '" target="_blank" rel="noopener" aria-label="' +
        ASV.escape(I18n.t("video.openAria", { name: name })) + '">' + poster + "</a>";

  return '<article class="asv-card video-card' + (opts.compact ? " is-compact" : "") + '" data-video-card="' + g.id + '">' +
    '<div class="video-frame" data-video-id="' + v.youtube + '" data-video-title="' + ASV.escape(name) + '">' + posterEl + "</div>" +
    '<div class="video-body">' +
      (opts.compact ? "" :
        '<h3 class="video-title">' + ASV.escape(name) + "</h3>" +
        '<p class="video-meta">' + ASV.escape(I18n.pick(g.place)) + (g.unesco ? " · UNESCO " + g.unesco.year : "") + "</p>") +
      '<div class="video-actions">' +
        (ASV.canEmbedVideo
          ? '<button type="button" class="btn btn-sm btn-outline-cham" data-video-play="' + v.youtube + '">' +
              ASV.icon("play") + "<span>" + I18n.t("video.watchHere") + "</span></button>"
          : "") +
        '<a class="btn btn-sm btn-outline-son" href="' + watchUrl + '" target="_blank" rel="noopener">' +
          "<span>" + I18n.t("video.youtube") + "</span>" + ASV.icon("external") +
          '<span class="visually-hidden">' + I18n.t("video.newTab") + "</span></a>" +
      "</div>" +
      '<p class="video-credit">' + ASV.videoCredit(v) + "</p>" +
    "</div></article>";
};

/* Chú thích dưới ảnh thật: nội dung ảnh + dòng nguồn (tác giả · nơi lấy ảnh · giấy phép), link tới trang gốc.
   Ảnh Wikimedia Commons: giấy phép CC hoặc phạm vi công cộng. Dùng ở trang Loại hình và Lịch sử. */
ASV.photoCaption = function (p) {
  var license = p.license === "Public domain" ? I18n.t("photo.pd") : I18n.pick(p.license);
  var credit = I18n.t("photo.credit", { author: I18n.pick(p.author) || I18n.t("photo.unknown"), license: license, source: I18n.pick(p.source || "Wikimedia Commons") });
  return '<figcaption><span class="photo-caption">' + ASV.escape(I18n.pick(p.caption)) + "</span><br>" +
    '<a class="photo-credit" href="' + p.page + '" target="_blank" rel="noopener">' + ASV.escape(credit) +
    '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a></figcaption>";
};

/* Dòng nguồn của video: video UNESCO ghi "Video: UNESCO · <đơn vị giữ bản quyền>" (link tới trang UNESCO);
   video của nhà hát hoặc báo chí nhà nước ghi rõ tên kênh (link tới kênh YouTube chính thức). */
ASV.videoCredit = function (v) {
  var tab = '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span>";
  if (v.unesco) {
    return I18n.t("video.source") + ' · <a href="' + v.unesco + '" target="_blank" rel="noopener">' + ASV.escape(v.credit) + tab + "</a>";
  }
  var text = I18n.t(v.kind === "press" ? "video.sourcePress" : "video.sourceTheatre", { channel: v.channel });
  return '<a href="' + v.channelUrl + '" target="_blank" rel="noopener">' + ASV.escape(text) + tab + "</a>";
};

/* Nghe bản ghi thật của một loại hình (video UNESCO):
   - chạy trên web → khung nổi (modal) phát video ngay trong trang;
   - mở bằng file:// → YouTube chặn phát nhúng nên mở video ở tab mới. */
ASV.openRecording = function (gid) {
  var g = ASV_DATA.genres.filter(function (x) { return x.id === gid; })[0];
  if (!g) return;
  var url = "https://www.youtube.com/watch?v=" + g.video.youtube;
  ASV.Player.stop(true);
  ASV.closeVideos();
  if (!ASV.canEmbedVideo || !window.bootstrap) {
    window.open(url, "_blank", "noopener");
    return;
  }
  var el = document.getElementById("recModal");
  if (!el) {
    el = document.createElement("div");
    el.className = "modal fade";
    el.id = "recModal";
    el.tabIndex = -1;
    el.setAttribute("aria-labelledby", "recTitle");
    el.innerHTML = '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content asv-modal">' +
      '<div class="modal-header"><h2 class="modal-title" id="recTitle"></h2>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body p-0"><div class="rec-frame"></div></div>' +
      '<div class="modal-footer"><p class="video-credit m-0" id="recCredit"></p></div></div></div>';
    document.body.appendChild(el);
    // Đóng khung thì gỡ trình phát để video dừng hẳn
    el.addEventListener("hidden.bs.modal", function () { el.querySelector(".rec-frame").innerHTML = ""; });
  }
  el.querySelector(".btn-close").setAttribute("aria-label", I18n.t("rec.close"));
  el.querySelector("#recTitle").textContent = I18n.t("rec.title", { name: I18n.pick(g.name) });
  el.querySelector(".rec-frame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + g.video.youtube +
    '?autoplay=1&rel=0" title="' + ASV.escape(I18n.pick(g.name)) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  el.querySelector("#recCredit").innerHTML = ASV.videoCredit(g.video);
  bootstrap.Modal.getOrCreateInstance(el).show();
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-recording]");
  if (btn) { e.preventDefault(); ASV.openRecording(btn.getAttribute("data-recording")); }
});

// Thay ảnh bìa bằng trình phát YouTube (chỉ khi chạy trên web)
ASV.openVideo = function (id) {
  var frame = document.querySelector('.video-frame[data-video-id="' + id + '"]');
  if (!frame || !ASV.canEmbedVideo) return;
  ASV.Player.stop(true);  // dừng âm thanh của site trước
  ASV.closeVideos(frame); // chỉ một video phát mỗi lúc
  frame.dataset.poster = frame.innerHTML;
  frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' +
    frame.getAttribute("data-video-title") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  frame.querySelector("iframe").focus();
};

// Đóng mọi video đang mở (trả lại ảnh bìa), trừ khung "except"
ASV.closeVideos = function (except) {
  document.querySelectorAll(".video-frame").forEach(function (frame) {
    if (frame !== except && frame.dataset.poster) {
      frame.innerHTML = frame.dataset.poster;
      delete frame.dataset.poster;
    }
  });
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-video-play]");
  if (btn) ASV.openVideo(btn.getAttribute("data-video-play"));
});

/* Thuật ngữ (ASV_DATA.glossary)
   Tìm thuật ngữ trong chữ của trang và biến chúng thành nút nhỏ có gạch chấm; bấm vào thì hiện khung giải thích.
   - Mỗi khối chữ (đoạn văn, mục danh sách…) chỉ đánh dấu lần xuất hiện ĐẦU TIÊN của mỗi từ cho đỡ rối mắt.
   - Không đánh dấu trong tiêu đề, nút, link, menu, ô nhập, vùng thông báo, mô hình nhạc cụ.
   - Chữ do JS vẽ lại (đổi ngôn ngữ, mở hộp chi tiết…) được đánh dấu lại nhờ MutationObserver.
   - Khung giải thích đóng bằng nút Đóng, phím Esc, hoặc bấm ra ngoài; focus quay về chữ vừa bấm. */
ASV.Glossary = (function () {
  var SKIP = "a, button, h1, h2, h3, h4, h5, h6, label, input, textarea, select, svg, script, style, " +
    "[aria-live], .visually-hidden, .site-header, .site-footer, .player-bar, .welcome, .hist-nav, " +
    ".play-pads, .filter-bar, .gloss-pop, .video-poster, .asv-toast, [data-no-gloss]";
  var BLOCK = "p, li, dd, td, small, figcaption, .hist-debate";
  var rules = [];   // [{ id, re }] cho ngôn ngữ đang dùng
  var pop = null, opener = null, observer = null, busy = false;

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Lập các biểu thức tìm từ; từ dài xếp trước để "danh sách đại diện" không bị cắt bởi từ ngắn hơn
  function build() {
    var lang = I18n.lang;
    var list = [];
    ASV_DATA.glossary.forEach(function (g) {
      g.match[lang].forEach(function (m) {
        list.push({ id: g.id, text: lang === "en" ? I18n.plain(m) : m });
      });
    });
    list.sort(function (a, b) { return b.text.length - a.text.length; });
    // Ranh giới từ cho cả chữ có dấu: trước và sau không được là chữ cái
    rules = list.map(function (x) {
      return { id: x.id, re: new RegExp("(^|[^\\p{L}])(" + escapeRe(x.text) + ")(?![\\p{L}])", "iu") };
    });
  }

  function byId(id) { return ASV_DATA.glossary.filter(function (g) { return g.id === id; })[0]; }

  // Đánh dấu thuật ngữ bên trong root
  function scan(root) {
    if (!root || busy) return;
    busy = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest(SKIP) || !p.closest(BLOCK)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var block = node.parentElement.closest(BLOCK);
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (block.querySelector('.gloss-term[data-gloss="' + rule.id + '"]')) continue; // khối này đã có từ đó
        var own = block.closest("[data-gloss-own]");
        if (own && own.getAttribute("data-gloss-own") === rule.id) continue;
        var m = rule.re.exec(node.nodeValue);
        if (!m) continue;
        // Tách nút chữ: [trước][TỪ][sau], rồi quét tiếp phần "sau"
        var start = m.index + m[1].length;
        var word = node.splitText(start);
        var rest = word.splitText(m[2].length);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gloss-term";
        btn.setAttribute("data-gloss", rule.id);
        btn.setAttribute("aria-haspopup", "dialog");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = word.nodeValue;
        word.parentNode.replaceChild(btn, word);
        node = rest;
        r = -1; // quét lại phần còn lại với mọi từ
      }
    });
    busy = false;
  }

  /* Khung giải thích */
  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "gloss-pop";
    pop.id = "glossPop";
    pop.setAttribute("role", "dialog");
    pop.hidden = true;
    document.body.appendChild(pop);
    return pop;
  }

  function open(btn) {
    var g = byId(btn.getAttribute("data-gloss"));
    if (!g) return;
    if (opener === btn) { close(true); return; }
    close(false);
    opener = btn;
    var el = ensurePop();
    var onGlossPage = document.body.getAttribute("data-page") === "glossary";
    el.setAttribute("aria-labelledby", "glossPopTitle");
    el.innerHTML =
      '<p class="gloss-pop-title" id="glossPopTitle">' + ASV.escape(I18n.pick(g.term)) + "</p>" +
      '<p class="gloss-pop-def">' + ASV.escape(I18n.pick(g.def)) + "</p>" +
      '<div class="gloss-pop-actions">' +
        '<a href="' + (onGlossPage ? "" : "glossary.html") + "#" + g.id + '">' + ASV.escape(I18n.t(onGlossPage ? "gloss.here" : "gloss.all")) + "</a>" +
        '<button type="button" class="btn btn-sm btn-outline-cham gloss-pop-close">' + ASV.escape(I18n.t("gloss.close")) + "</button>" +
      "</div>";
    el.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-controls", "glossPop");
    place();
    el.querySelector(".gloss-pop-close").focus({ preventScroll: true });
  }

  // Đặt khung ngay dưới chữ (hoặc trên nếu sát đáy màn hình), không tràn ra hai bên
  function place() {
    if (!opener || !pop || pop.hidden) return;
    var r = opener.getBoundingClientRect();
    var w = Math.min(320, document.documentElement.clientWidth - 24);
    pop.style.width = w + "px";
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), document.documentElement.clientWidth - w - 12);
    var top = r.bottom + 8;
    if (top + pop.offsetHeight > window.innerHeight - 8 && r.top - pop.offsetHeight - 8 > 0) top = r.top - pop.offsetHeight - 8;
    pop.style.left = (left + window.scrollX) + "px";
    pop.style.top = (top + window.scrollY) + "px";
  }

  function close(returnFocus) {
    if (!opener) return;
    var btn = opener;
    opener = null;
    btn.setAttribute("aria-expanded", "false");
    if (pop) pop.hidden = true;
    if (returnFocus && document.contains(btn)) btn.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest(".gloss-term");
    if (t) { e.preventDefault(); open(t); return; }
    if (e.target.closest(".gloss-pop-close")) { close(true); return; }
    if (e.target.closest(".gloss-pop a")) { close(false); return; } // sang mục từ: đóng khung
    if (opener && !e.target.closest(".gloss-pop")) close(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && opener) close(true);
  });
  window.addEventListener("resize", place);

  function start() {
    build();
    scan(document.body);
    // Chữ mới do JS vẽ ra → đánh dấu lại (gộp nhiều thay đổi thành một lần quét)
    var timer = null;
    observer = new MutationObserver(function () {
      if (busy) return;
      clearTimeout(timer);
      timer = setTimeout(function () { scan(document.body); }, 60);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  document.addEventListener("asv:langchange", function () {
    close(false);
    build();
    scan(document.body);
  });

  return { start: start, scan: scan, close: close };
})();

/* Khởi động
   ASV.ready(fn): trang riêng đăng ký hàm chạy sau khi phần chung đã sẵn sàng */
(function () {
  var queue = [], done = false;
  ASV.ready = function (fn) { if (done) fn(); else queue.push(fn); };

  document.addEventListener("DOMContentLoaded", function () {
    ASV.renderHeader();
    ASV.renderFooter();
    ASV.renderNext();
    ASV.fillMotifs(document);
    ASV.buildPlayables();
    ASV.renderPlayerBar();
    I18n.apply(document);
    done = true;
    queue.forEach(function (fn) { fn(); });
    ASV.syncPlayButtons();
    if (ASV_DATA.glossary) ASV.Glossary.start(); // sau khi trang đã vẽ xong phần của mình
  });

  // Đổi ngôn ngữ → cập nhật phần chung (từng trang tự vẽ lại phần riêng)
  document.addEventListener("asv:langchange", function () {
    ASV.syncLangButtons();
    ASV.syncPlayButtons();
    ASV.updatePlayerBar();
    // Ẩn thông báo đang hiện (nó còn viết bằng ngôn ngữ cũ)
    var toast = document.querySelector(".asv-toast");
    if (toast) { toast.classList.remove("is-visible"); toast.textContent = ""; }
    // Bỏ cả thông báo đang chờ ghi (nó viết bằng ngôn ngữ cũ)
    clearTimeout(ASV.announce.timer);
    var live = document.getElementById("asvLive");
    if (live) live.textContent = "";
  });
})();
