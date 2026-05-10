const fs = require('fs');

const data = [
  // THE BODY AND THE FACE
  // Starters
  { w: "arm", id: "st-bf-001", cert: "starters", topic: "body_face", trans: "cánh tay", type: "noun", emoji: "💪", ipa: "/ɑːrm/", en: "He has strong arms.", vi: "Anh ấy có đôi cánh tay khỏe mạnh." },
  { w: "body", id: "st-bf-002", cert: "starters", topic: "body_face", trans: "cơ thể", type: "noun", emoji: "🧍", ipa: "/ˈbɑː.di/", en: "Exercise is good for your body.", vi: "Tập thể dục rất tốt cho cơ thể của bạn." },
  { w: "ear", id: "st-bf-003", cert: "starters", topic: "body_face", trans: "cái tai", type: "noun", emoji: "👂", ipa: "/ɪr/", en: "An elephant has big ears.", vi: "Một con voi có đôi tai to." },
  { w: "eye", id: "st-bf-004", cert: "starters", topic: "body_face", trans: "con mắt", type: "noun", emoji: "👁️", ipa: "/aɪ/", en: "She has blue eyes.", vi: "Cô ấy có đôi mắt màu xanh dương." },
  { w: "face", id: "st-bf-005", cert: "starters", topic: "body_face", trans: "khuôn mặt", type: "noun", emoji: "👦", ipa: "/feɪs/", en: "Wash your face every morning.", vi: "Hãy rửa mặt vào mỗi buổi sáng." },
  { w: "foot", id: "st-bf-006", cert: "starters", topic: "body_face", trans: "bàn chân", type: "noun", emoji: "🦶", ipa: "/fʊt/", en: "My left foot hurts.", vi: "Bàn chân trái của tôi bị đau." },
  { w: "feet", id: "st-bf-007", cert: "starters", topic: "body_face", trans: "những bàn chân", type: "noun", emoji: "🦶", ipa: "/fiːt/", en: "He has very big feet.", vi: "Anh ấy có đôi bàn chân rất to." },
  { w: "hair", id: "st-bf-008", cert: "starters", topic: "body_face", trans: "mái tóc", type: "noun", emoji: "💇", ipa: "/her/", en: "She has long black hair.", vi: "Cô ấy có mái tóc đen dài." },
  { w: "hand", id: "st-bf-009", cert: "starters", topic: "body_face", trans: "bàn tay", type: "noun", emoji: "✋", ipa: "/hænd/", en: "Wash your hands before eating.", vi: "Hãy rửa tay trước khi ăn." },
  { w: "head", id: "st-bf-010", cert: "starters", topic: "body_face", trans: "cái đầu", type: "noun", emoji: "🗣️", ipa: "/hed/", en: "He is wearing a hat on his head.", vi: "Anh ấy đang đội mũ trên đầu." },
  { w: "leg", id: "st-bf-011", cert: "starters", topic: "body_face", trans: "cái chân", type: "noun", emoji: "🦵", ipa: "/leɡ/", en: "A spider has eight legs.", vi: "Một con nhện có tám cái chân." },
  { w: "mouth", id: "st-bf-012", cert: "starters", topic: "body_face", trans: "cái miệng", type: "noun", emoji: "👄", ipa: "/maʊθ/", en: "Open your mouth, please.", vi: "Vui lòng mở miệng ra." },
  { w: "nose", id: "st-bf-013", cert: "starters", topic: "body_face", trans: "cái mũi", type: "noun", emoji: "👃", ipa: "/noʊz/", en: "A dog has a good nose.", vi: "Một con chó có cái mũi thính." },
  { w: "smile", id: "st-bf-014", cert: "starters", topic: "body_face", trans: "nụ cười / mỉm cười", type: "noun/verb", emoji: "😊", ipa: "/smaɪl/", en: "She has a beautiful smile.", vi: "Cô ấy có một nụ cười đẹp." },

  // Movers
  { w: "back", id: "mv-bf-001", cert: "movers", topic: "body_face", trans: "cái lưng", type: "noun", emoji: "🔙", ipa: "/bæk/", en: "My back hurts after carrying heavy boxes.", vi: "Lưng tôi bị đau sau khi vác những chiếc hộp nặng." },
  { w: "beard", id: "mv-bf-002", cert: "movers", topic: "body_face", trans: "râu quai nón", type: "noun", emoji: "🧔", ipa: "/bɪrd/", en: "My grandfather has a long white beard.", vi: "Ông của tôi có một bộ râu quai nón dài màu trắng." },
  { w: "blond", id: "mv-bf-003", cert: "movers", topic: "body_face", trans: "màu vàng hoe (tóc)", type: "adjective", emoji: "👱", ipa: "/blɑːnd/", en: "The boy has short blond hair.", vi: "Cậu bé có mái tóc ngắn màu vàng hoe." },
  { w: "curly", id: "mv-bf-004", cert: "movers", topic: "body_face", trans: "xoăn (tóc)", type: "adjective", emoji: "➰", ipa: "/ˈkɜːr.li/", en: "She has curly brown hair.", vi: "Cô ấy có mái tóc xoăn màu nâu." },
  { w: "fair", id: "mv-bf-005", cert: "movers", topic: "body_face", trans: "sáng màu (tóc/da)", type: "adjective", emoji: "👱🏻", ipa: "/fer/", en: "People in cold countries often have fair skin.", vi: "Người ở những vùng lạnh thường có làn da sáng màu." },
  { w: "fat", id: "mv-bf-006", cert: "movers", topic: "body_face", trans: "béo, mập", type: "adjective", emoji: "🫃", ipa: "/fæt/", en: "The cat is too fat to jump.", vi: "Con mèo quá béo nên không thể nhảy được." },
  { w: "moustache", id: "mv-bf-007", cert: "movers", topic: "body_face", trans: "ria mép", type: "noun", emoji: "🧔", ipa: "/ˈmʌs.tæʃ/", en: "He shaved his moustache this morning.", vi: "Anh ấy đã cạo ria mép sáng nay." },
  { w: "neck", id: "mv-bf-008", cert: "movers", topic: "body_face", trans: "cái cổ", type: "noun", emoji: "🦒", ipa: "/nek/", en: "A giraffe has a very long neck.", vi: "Một con hươu cao cổ có cái cổ rất dài." },
  { w: "shoulder", id: "mv-bf-009", cert: "movers", topic: "body_face", trans: "bờ vai", type: "noun", emoji: "🤷", ipa: "/ˈʃoʊl.dɚ/", en: "She tapped him on the shoulder.", vi: "Cô ấy vỗ nhẹ lên vai anh ấy." },
  { w: "stomach", id: "mv-bf-010", cert: "movers", topic: "body_face", trans: "bụng, dạ dày", type: "noun", emoji: "🤰", ipa: "/ˈstʌm.ək/", en: "My stomach is full after a big meal.", vi: "Bụng tôi đã no sau một bữa ăn lớn." },
  { w: "thin", id: "mv-bf-011", cert: "movers", topic: "body_face", trans: "gầy, ốm", type: "adjective", emoji: "🥢", ipa: "/θɪn/", en: "The dog was very thin and hungry.", vi: "Con chó rất gầy và đói." },
  { w: "tooth", id: "mv-bf-012", cert: "movers", topic: "body_face", trans: "chiếc răng", type: "noun", emoji: "🦷", ipa: "/tuːθ/", en: "My front tooth is loose.", vi: "Chiếc răng cửa của tôi bị lung lay." },
  { w: "teeth", id: "mv-bf-013", cert: "movers", topic: "body_face", trans: "những chiếc răng", type: "noun", emoji: "🦷", ipa: "/tiːθ/", en: "Brush your teeth twice a day.", vi: "Hãy đánh răng hai lần một ngày." },

  // Flyers
  { w: "elbow", id: "fl-bf-001", cert: "flyers", topic: "body_face", trans: "cùi chỏ, khuỷu tay", type: "noun", emoji: "💪", ipa: "/ˈel.boʊ/", en: "He hit his elbow on the table.", vi: "Anh ấy đập cùi chỏ vào bàn." },
  { w: "finger", id: "fl-bf-002", cert: "flyers", topic: "body_face", trans: "ngón tay", type: "noun", emoji: "☝️", ipa: "/ˈfɪŋ.ɡɚ/", en: "You have five fingers on each hand.", vi: "Bạn có năm ngón tay trên mỗi bàn tay." },
  { w: "knee", id: "fl-bf-003", cert: "flyers", topic: "body_face", trans: "đầu gối", type: "noun", emoji: "🧎", ipa: "/niː/", en: "She fell and hurt her knee.", vi: "Cô ấy ngã và làm đau đầu gối." },
  { w: "toe", id: "fl-bf-004", cert: "flyers", topic: "body_face", trans: "ngón chân", type: "noun", emoji: "🦶", ipa: "/toʊ/", en: "These shoes are too tight, my toes hurt.", vi: "Đôi giày này quá chật, các ngón chân của tôi bị đau." },

  // CLOTHES
  // Starters
  { w: "bag", id: "st-cl-001", cert: "starters", topic: "clothes", trans: "cái túi", type: "noun", emoji: "👜", ipa: "/bæɡ/", en: "She put her books in her bag.", vi: "Cô ấy cất sách vào trong túi." },
  { w: "baseball cap", id: "st-cl-002", cert: "starters", topic: "clothes", trans: "mũ lưỡi trai", type: "noun", emoji: "🧢", ipa: "/ˈbeɪs.bɑːl kæp/", en: "He always wears a baseball cap.", vi: "Anh ấy luôn đội một chiếc mũ lưỡi trai." },
  { w: "boots", id: "st-cl-003", cert: "starters", topic: "clothes", trans: "ủng, bốt", type: "noun", emoji: "👢", ipa: "/buːts/", en: "Wear your boots because it is raining.", vi: "Hãy mang ủng vào vì trời đang mưa." },
  { w: "clothes", id: "st-cl-004", cert: "starters", topic: "clothes", trans: "quần áo", type: "noun", emoji: "👕", ipa: "/kloʊðz/", en: "I need to wash my dirty clothes.", vi: "Tôi cần giặt những bộ quần áo bẩn." },
  { w: "dress", id: "st-cl-005", cert: "starters", topic: "clothes", trans: "cái váy liền", type: "noun", emoji: "👗", ipa: "/dres/", en: "She wore a beautiful pink dress.", vi: "Cô ấy mặc một chiếc váy liền màu hồng tuyệt đẹp." },
  { w: "glasses", id: "st-cl-006", cert: "starters", topic: "clothes", trans: "mắt kính", type: "noun", emoji: "👓", ipa: "/ˈɡlæs.ɪz/", en: "He needs glasses for reading.", vi: "Anh ấy cần mắt kính để đọc sách." },
  { w: "handbag", id: "st-cl-007", cert: "starters", topic: "clothes", trans: "túi xách tay", type: "noun", emoji: "👜", ipa: "/ˈhænd.bæɡ/", en: "Her handbag is very heavy.", vi: "Túi xách tay của cô ấy rất nặng." },
  { w: "hat", id: "st-cl-008", cert: "starters", topic: "clothes", trans: "cái mũ", type: "noun", emoji: "👒", ipa: "/hæt/", en: "Put on your hat when you go out.", vi: "Hãy đội mũ khi bạn ra ngoài." },
  { w: "jacket", id: "st-cl-009", cert: "starters", topic: "clothes", trans: "áo khoác", type: "noun", emoji: "🧥", ipa: "/ˈdʒæk.ɪt/", en: "It's cold outside, wear a jacket.", vi: "Ngoài trời lạnh lắm, hãy mặc áo khoác vào." },
  { w: "jeans", id: "st-cl-010", cert: "starters", topic: "clothes", trans: "quần jean", type: "noun", emoji: "👖", ipa: "/dʒiːnz/", en: "He usually wears blue jeans.", vi: "Anh ấy thường mặc quần jean màu xanh." },
  { w: "shirt", id: "st-cl-011", cert: "starters", topic: "clothes", trans: "áo sơ mi", type: "noun", emoji: "👔", ipa: "/ʃɜːrt/", en: "He bought a new white shirt.", vi: "Anh ấy đã mua một chiếc áo sơ mi trắng mới." },
  { w: "shoe", id: "st-cl-012", cert: "starters", topic: "clothes", trans: "chiếc giày", type: "noun", emoji: "👞", ipa: "/ʃuː/", en: "I can't find my left shoe.", vi: "Tôi không tìm thấy chiếc giày trái của mình." },
  { w: "shorts", id: "st-cl-013", cert: "starters", topic: "clothes", trans: "quần đùi", type: "noun", emoji: "🩳", ipa: "/ʃɔːrts/", en: "He is wearing shorts in summer.", vi: "Anh ấy mặc quần đùi vào mùa hè." },
  { w: "skirt", id: "st-cl-014", cert: "starters", topic: "clothes", trans: "chân váy", type: "noun", emoji: "👗", ipa: "/skɜːrt/", en: "She has a long black skirt.", vi: "Cô ấy có một chiếc chân váy dài màu đen." },
  { w: "sock", id: "st-cl-015", cert: "starters", topic: "clothes", trans: "chiếc tất", type: "noun", emoji: "🧦", ipa: "/sɑːk/", en: "There is a hole in my sock.", vi: "Có một lỗ thủng trên chiếc tất của tôi." },
  { w: "trousers", id: "st-cl-016", cert: "starters", topic: "clothes", trans: "quần dài", type: "noun", emoji: "👖", ipa: "/ˈtraʊ.zɚz/", en: "He wears grey trousers to work.", vi: "Anh ấy mặc quần dài màu xám đi làm." },
  { w: "T-shirt", id: "st-cl-017", cert: "starters", topic: "clothes", trans: "áo thun", type: "noun", emoji: "👕", ipa: "/ˈtiː.ʃɜːrt/", en: "He gave me a white T-shirt.", vi: "Anh ấy đã tặng tôi một chiếc áo thun trắng." },
  { w: "wear", id: "st-cl-018", cert: "starters", topic: "clothes", trans: "mặc, đội, mang", type: "verb", emoji: "👚", ipa: "/wer/", en: "What are you going to wear today?", vi: "Hôm nay bạn định mặc gì?" },

  // Movers
  { w: "coat", id: "mv-cl-001", cert: "movers", topic: "clothes", trans: "áo choàng", type: "noun", emoji: "🧥", ipa: "/koʊt/", en: "Put on your winter coat.", vi: "Hãy mặc áo choàng mùa đông vào." },
  { w: "helmet", id: "mv-cl-002", cert: "movers", topic: "clothes", trans: "mũ bảo hiểm", type: "noun", emoji: "⛑️", ipa: "/ˈhel.mət/", en: "Always wear a helmet when riding a bike.", vi: "Luôn đội mũ bảo hiểm khi đạp xe." },
  { w: "scarf", id: "mv-cl-003", cert: "movers", topic: "clothes", trans: "khăn quàng cổ", type: "noun", emoji: "🧣", ipa: "/skɑːrf/", en: "She wrapped a scarf around her neck.", vi: "Cô ấy quấn một chiếc khăn quanh cổ." },
  { w: "sweater", id: "mv-cl-004", cert: "movers", topic: "clothes", trans: "áo len", type: "noun", emoji: "🧶", ipa: "/ˈswet.ɚ/", en: "My grandmother knitted me a red sweater.", vi: "Bà nội tôi đã đan cho tôi một chiếc áo len đỏ." },
  { w: "swimsuit", id: "mv-cl-005", cert: "movers", topic: "clothes", trans: "đồ bơi", type: "noun", emoji: "👙", ipa: "/ˈswɪm.suːt/", en: "Don't forget to pack your swimsuit for the beach.", vi: "Đừng quên chuẩn bị đồ bơi để đi biển." },

  // Flyers
  { w: "belt", id: "fl-cl-001", cert: "flyers", topic: "clothes", trans: "thắt lưng", type: "noun", emoji: "🥋", ipa: "/belt/", en: "These trousers are too big, I need a belt.", vi: "Chiếc quần này quá rộng, tôi cần một cái thắt lưng." },
  { w: "bracelet", id: "fl-cl-002", cert: "flyers", topic: "clothes", trans: "vòng tay", type: "noun", emoji: "📿", ipa: "/ˈbreɪ.slət/", en: "She gave me a silver bracelet.", vi: "Cô ấy đã tặng tôi một chiếc vòng tay bạc." },
  { w: "costume", id: "fl-cl-003", cert: "flyers", topic: "clothes", trans: "trang phục hóa trang", type: "noun", emoji: "🧛", ipa: "/ˈkɑː.stuːm/", en: "He wore a pirate costume to the party.", vi: "Anh ấy đã mặc trang phục cướp biển đến bữa tiệc." },
  { w: "crown", id: "fl-cl-004", cert: "flyers", topic: "clothes", trans: "vương miện", type: "noun", emoji: "👑", ipa: "/kraʊn/", en: "The queen wears a golden crown.", vi: "Nữ hoàng đội một chiếc vương miện bằng vàng." },
  { w: "glove", id: "fl-cl-005", cert: "flyers", topic: "clothes", trans: "găng tay", type: "noun", emoji: "🧤", ipa: "/ɡlʌv/", en: "I lost one glove in the snow.", vi: "Tôi đã làm mất một chiếc găng tay trong tuyết." },
  { w: "necklace", id: "fl-cl-006", cert: "flyers", topic: "clothes", trans: "vòng cổ", type: "noun", emoji: "📿", ipa: "/ˈnek.ləs/", en: "She wears a diamond necklace.", vi: "Cô ấy đeo một chiếc vòng cổ kim cương." },
  { w: "pajamas", id: "fl-cl-007", cert: "flyers", topic: "clothes", trans: "đồ ngủ (US)", type: "noun", emoji: "👘", ipa: "/pəˈdʒɑː.məz/", en: "I put on my pajamas and went to bed.", vi: "Tôi mặc đồ ngủ và đi ngủ." },
  { w: "pyjamas", id: "fl-cl-008", cert: "flyers", topic: "clothes", trans: "đồ ngủ (UK)", type: "noun", emoji: "👘", ipa: "/pɪˈdʒɑː.məz/", en: "He sleeps in his blue pyjamas.", vi: "Anh ấy ngủ trong bộ đồ ngủ màu xanh lam." },
  { w: "pocket", id: "fl-cl-009", cert: "flyers", topic: "clothes", trans: "túi quần/áo", type: "noun", emoji: "👖", ipa: "/ˈpɑː.kɪt/", en: "He put the money in his pocket.", vi: "Anh ấy đã cất tiền vào túi quần." },
  { w: "ring", id: "fl-cl-010", cert: "flyers", topic: "clothes", trans: "chiếc nhẫn", type: "noun", emoji: "💍", ipa: "/rɪŋ/", en: "He bought her a diamond ring.", vi: "Anh ấy đã mua cho cô một chiếc nhẫn kim cương." },
  { w: "sunglasses", id: "fl-cl-011", cert: "flyers", topic: "clothes", trans: "kính râm", type: "noun", emoji: "🕶️", ipa: "/ˈsʌnˌɡlæs.ɪz/", en: "Wear your sunglasses to protect your eyes.", vi: "Hãy đeo kính râm để bảo vệ đôi mắt của bạn." },
  { w: "trainers", id: "fl-cl-012", cert: "flyers", topic: "clothes", trans: "giày thể thao", type: "noun", emoji: "👟", ipa: "/ˈtreɪ.nɚz/", en: "I bought a new pair of trainers for running.", vi: "Tôi đã mua một đôi giày thể thao mới để chạy bộ." },
  { w: "umbrella", id: "fl-cl-013", cert: "flyers", topic: "clothes", trans: "cái ô, cái dù", type: "noun", emoji: "☂️", ipa: "/ʌmˈbrel.ə/", en: "It's raining, take an umbrella with you.", vi: "Trời đang mưa, hãy mang theo ô." },
  { w: "uniform", id: "fl-cl-014", cert: "flyers", topic: "clothes", trans: "đồng phục", type: "noun", emoji: "🧑‍✈️", ipa: "/ˈjuː.nə.fɔːrm/", en: "Students have to wear a school uniform.", vi: "Học sinh phải mặc đồng phục trường." },

  // COLOURS
  // Starters
  { w: "black", id: "st-co-001", cert: "starters", topic: "colours", trans: "màu đen", type: "noun/adjective", emoji: "⬛", ipa: "/blæk/", en: "She has a black cat.", vi: "Cô ấy có một con mèo đen." },
  { w: "blue", id: "st-co-002", cert: "starters", topic: "colours", trans: "màu xanh dương", type: "noun/adjective", emoji: "🟦", ipa: "/bluː/", en: "The sky is blue today.", vi: "Bầu trời hôm nay có màu xanh dương." },
  { w: "brown", id: "st-co-003", cert: "starters", topic: "colours", trans: "màu nâu", type: "noun/adjective", emoji: "🟫", ipa: "/braʊn/", en: "The tree trunk is brown.", vi: "Thân cây có màu nâu." },
  { w: "colour", id: "st-co-004", cert: "starters", topic: "colours", trans: "màu sắc (UK)", type: "noun", emoji: "🎨", ipa: "/ˈkʌl.ɚ/", en: "What is your favourite colour?", vi: "Màu sắc yêu thích của bạn là gì?" },
  { w: "color", id: "st-co-005", cert: "starters", topic: "colours", trans: "màu sắc (US)", type: "noun", emoji: "🎨", ipa: "/ˈkʌl.ɚ/", en: "I like bright colors.", vi: "Tôi thích những màu sắc sặc sỡ." },
  { w: "gray", id: "st-co-006", cert: "starters", topic: "colours", trans: "màu xám (US)", type: "noun/adjective", emoji: "⬜", ipa: "/ɡreɪ/", en: "The clouds are gray.", vi: "Những đám mây có màu xám." },
  { w: "grey", id: "st-co-007", cert: "starters", topic: "colours", trans: "màu xám (UK)", type: "noun/adjective", emoji: "⬜", ipa: "/ɡreɪ/", en: "He wears a grey shirt.", vi: "Anh ấy mặc một chiếc áo màu xám." },
  { w: "green", id: "st-co-008", cert: "starters", topic: "colours", trans: "màu xanh lá", type: "noun/adjective", emoji: "🟩", ipa: "/ɡriːn/", en: "The grass is green.", vi: "Cỏ có màu xanh lá." },
  { w: "orange", id: "st-co-009", cert: "starters", topic: "colours", trans: "màu cam", type: "noun/adjective", emoji: "🟧", ipa: "/ˈɔːr.ɪndʒ/", en: "I have an orange T-shirt.", vi: "Tôi có một chiếc áo thun màu cam." },
  { w: "pink", id: "st-co-010", cert: "starters", topic: "colours", trans: "màu hồng", type: "noun/adjective", emoji: "🟪", ipa: "/pɪŋk/", en: "She loves her pink dress.", vi: "Cô ấy yêu chiếc váy màu hồng của mình." },
  { w: "purple", id: "st-co-011", cert: "starters", topic: "colours", trans: "màu tím", type: "noun/adjective", emoji: "🟪", ipa: "/ˈpɝː.pəl/", en: "Grapes can be green or purple.", vi: "Nho có thể có màu xanh lá hoặc màu tím." },
  { w: "red", id: "st-co-012", cert: "starters", topic: "colours", trans: "màu đỏ", type: "noun/adjective", emoji: "🟥", ipa: "/red/", en: "Apples are often red.", vi: "Những quả táo thường có màu đỏ." },
  { w: "white", id: "st-co-013", cert: "starters", topic: "colours", trans: "màu trắng", type: "noun/adjective", emoji: "⬜", ipa: "/waɪt/", en: "Snow is white.", vi: "Tuyết có màu trắng." },
  { w: "yellow", id: "st-co-014", cert: "starters", topic: "colours", trans: "màu vàng", type: "noun/adjective", emoji: "🟨", ipa: "/ˈjel.oʊ/", en: "The sun is yellow.", vi: "Mặt trời có màu vàng." },

  // Flyers
  { w: "gold", id: "fl-co-001", cert: "flyers", topic: "colours", trans: "màu vàng kim", type: "noun/adjective", emoji: "🥇", ipa: "/ɡoʊld/", en: "She wears a gold ring.", vi: "Cô ấy đeo một chiếc nhẫn vàng kim." },
  { w: "silver", id: "fl-co-002", cert: "flyers", topic: "colours", trans: "màu bạc", type: "noun/adjective", emoji: "🥈", ipa: "/ˈsɪl.vɚ/", en: "He drives a silver car.", vi: "Anh ấy lái một chiếc xe hơi màu bạc." },
  { w: "spot", id: "fl-co-003", cert: "flyers", topic: "colours", trans: "dấu chấm, đốm", type: "noun", emoji: "⏺️", ipa: "/spɑːt/", en: "The dog has a black spot on its eye.", vi: "Con chó có một đốm đen trên mắt." },
  { w: "spotted", id: "fl-co-004", cert: "flyers", topic: "colours", trans: "có đốm", type: "adjective", emoji: "🐆", ipa: "/ˈspɑː.t̬ɪd/", en: "She wore a spotted dress.", vi: "Cô ấy đã mặc một chiếc váy có đốm." },
  { w: "stripe", id: "fl-co-005", cert: "flyers", topic: "colours", trans: "đường sọc", type: "noun", emoji: "🦓", ipa: "/straɪp/", en: "The zebra has black and white stripes.", vi: "Con ngựa vằn có những đường sọc đen và trắng." },
  { w: "striped", id: "fl-co-006", cert: "flyers", topic: "colours", trans: "có sọc", type: "adjective", emoji: "🦓", ipa: "/straɪpt/", en: "He is wearing a striped shirt.", vi: "Anh ấy đang mặc một chiếc áo sơ mi có sọc." }
];

let sql = `
-- Cập nhật vocabulary_bank với 3 chủ đề mới: body_face, clothes, colours
-- Group tag được set trùng với certificate (starters, movers, flyers) như yêu cầu

`;

function getCertOrder(cert) {
  if (cert === "starters") return 1;
  if (cert === "movers") return 2;
  if (cert === "flyers") return 3;
  return 3;
}

data.forEach(item => {
  const cOrder = getCertOrder(item.cert);
  
  // Xử lý escape quote cho SQL
  const word = item.w.replace(/'/g, "''");
  const trans = item.trans.replace(/'/g, "''");
  const en = item.en.replace(/'/g, "''");
  const vi = item.vi.replace(/'/g, "''");
  
  // Chú ý: group_tag = item.cert
  sql += `INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('${item.id}', '${word}', '${trans}', '${item.cert}', ${cOrder}, '${item.ipa}', '${item.type}', '${en}', '${vi}', 'english', '${item.cert}', ${cOrder}, '${item.topic}', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
`;

  if (item.emoji) {
    sql += `UPDATE vocabulary_bank SET emoji = '${item.emoji}' WHERE id = '${item.id}';\n`;
  }
});

// Update missing animals based on the image:
// In the current DB, 'bat', 'dolphin', 'kangaroo', 'penguin', 'shark', 'whale' are in 'flyers'
// but the image shows them in 'movers'. So we should update them:
sql += `
-- UPDATE ANIMALS TO MATCH THE PROVIDED IMAGE
UPDATE vocabulary_bank SET certificate = 'movers', cert_order = 2, group_tag = 'movers', level_order = 2 
WHERE topic = 'animals' AND word IN ('bat', 'dolphin', 'kangaroo', 'penguin', 'shark', 'whale');

-- And 'crocodile', 'jellyfish' are in 'flyers' in DB, but 'starters' in image
UPDATE vocabulary_bank SET certificate = 'starters', cert_order = 1, group_tag = 'starters', level_order = 1 
WHERE topic = 'animals' AND word IN ('crocodile', 'jellyfish');

-- Also, let's make sure group_tag matches certificate for all existing animals as requested:
UPDATE vocabulary_bank SET group_tag = certificate WHERE topic = 'animals';
`;

fs.writeFileSync('src/worker/migrations/0009_seed_vocabulary_batch5.sql', sql);
console.log("Generated src/worker/migrations/0009_seed_vocabulary_batch5.sql");
