import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA = [
  {
    id: "WRITING-EASY-GRADE4-P1",
    title: "Writing — Dễ — Lớp 4-5 — Bài 1",
    grade_min: 4,
    grade_max: 5,
    grade_target: "4-5",
    sec1: [
      {
        display_cues: "is playing / my brother / in the school yard / basketball /.//",
        cues_segments: [
          { text: "is playing / my brother / in the school " },
          { text: "yard", tooltip: { vi: "sân (trường)", ipa: "jɑːd" } },
          { text: " / " },
          { text: "basketball", tooltip: { vi: "bóng rổ", ipa: "ˈbɑːskɪtbɔːl" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3}.",
        word_bank: ["my brother", "is playing", "basketball", "in the school yard"],
        correct_sentence: "My brother is playing basketball in the school yard.",
        structure_vi: "S + is/are/am + V-ing + O + nơi chốn",
        grammar_notes: [
          "✅ Hiện tại tiếp diễn: 'is playing' dùng để diễn tả hành động đang xảy ra",
          "✅ Chủ ngữ 'my brother' số ít nên dùng to be 'is'",
          "✅ Cụm từ chỉ nơi chốn 'in the school yard' thường đứng ở cuối câu"
        ],
        vocab_notes: [
          { word: "play basketball", vi: "chơi bóng rổ", ipa: "pleɪ ˈbɑːskɪtbɔːl" },
          { word: "school yard", vi: "sân trường", ipa: "skuːl jɑːd" }
        ],
        common_mistakes: [
          "❌ Sai: 'My brother playing' → thiếu động từ to be 'is'",
          "❌ Sai: 'My brother is play' → thì hiện tại tiếp diễn phải dùng V-ing"
        ]
      },
      {
        display_cues: "went to / they / with their friends / the zoo / last weekend /.//",
        cues_segments: [
          { text: "went to / they / with their friends / the " },
          { text: "zoo", tooltip: { vi: "sở thú", ipa: "zuː" } },
          { text: " / " },
          { text: "last weekend", tooltip: { vi: "cuối tuần trước", ipa: "lɑːst ˌwiːkˈend" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["they", "went to", "the zoo", "with their friends", "last weekend"],
        correct_sentence: "They went to the zoo with their friends last weekend.",
        structure_vi: "S + V(quá khứ) + nơi chốn + with + người + thời gian",
        grammar_notes: [
          "✅ Dấu hiệu 'last weekend' cho biết câu ở thì Quá khứ đơn",
          "✅ 'went' là quá khứ của động từ bất quy tắc 'go'",
          "✅ Thứ tự: Hành động (went to the zoo) → Với ai (with their friends) → Khi nào (last weekend)"
        ],
        vocab_notes: [
          { word: "go to the zoo", vi: "đi sở thú", ipa: "ɡəʊ tʊ ðə zuː" },
          { word: "weekend", vi: "cuối tuần", ipa: "ˌwiːkˈend" }
        ],
        common_mistakes: [
          "❌ Sai: 'They go to the zoo last weekend' → chưa chia động từ về quá khứ 'went'",
          "❌ Sai: 'went to the zoo last weekend with their friends' → 'với ai' thường đứng trước 'khi nào'"
        ]
      },
      {
        display_cues: "always / she / her teeth / brushes / before going to bed /.//",
        cues_segments: [
          { text: "always / she / her " },
          { text: "teeth", tooltip: { vi: "răng (số nhiều)", ipa: "tiːθ" } },
          { text: " / brushes / " },
          { text: "before", tooltip: { vi: "trước khi", ipa: "bɪˈfɔː" } },
          { text: " going to bed /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["she", "always", "brushes", "her teeth", "before going to bed"],
        correct_sentence: "She always brushes her teeth before going to bed.",
        structure_vi: "S + trạng từ tần suất + V(s/es) + O + before + V-ing",
        grammar_notes: [
          "✅ Trạng từ chỉ tần suất 'always' đứng TRƯỚC động từ thường 'brushes'",
          "✅ 'brushes' thêm -es vì kết thúc bằng chữ 'sh', đi với chủ ngữ số ít 'she'",
          "✅ Sau giới từ 'before' động từ phải thêm đuôi -ing ('going')"
        ],
        vocab_notes: [
          { word: "brush teeth", vi: "đánh răng", ipa: "brʌʃ tiːθ" },
          { word: "always", vi: "luôn luôn", ipa: "ˈɔːlweɪz" }
        ],
        common_mistakes: [
          "❌ Sai: 'She brushes always' → 'always' phải đứng trước động từ",
          "❌ Sai: 'before go to bed' → sau 'before' phải dùng V-ing 'going'"
        ]
      },
      {
        display_cues: "didn't / yesterday evening / we / watch TV / we were busy / because /.//",
        cues_segments: [
          { text: "didn't / yesterday evening / we / watch TV / we were " },
          { text: "busy", tooltip: { vi: "bận rộn", ipa: "ˈbɪzi" } },
          { text: " / " },
          { text: "because", tooltip: { vi: "bởi vì", ipa: "bɪˈkɒz" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["we", "didn't", "watch TV", "yesterday evening", "because", "we were busy"],
        correct_sentence: "We didn't watch TV yesterday evening because we were busy.",
        structure_vi: "S + didn't + V(nguyên) + thời gian + because + S + V",
        grammar_notes: [
          "✅ Câu phủ định thì quá khứ đơn mượn trợ động từ 'didn't', sau đó động từ 'watch' giữ nguyên",
          "✅ 'because' (bởi vì) dùng để nối 2 mệnh đề chỉ nguyên nhân - kết quả"
        ],
        vocab_notes: [
          { word: "watch TV", vi: "xem tivi", ipa: "wɒtʃ ˌtiːˈviː" },
          { word: "busy", vi: "bận rộn", ipa: "ˈbɪzi" }
        ],
        common_mistakes: [
          "❌ Sai: 'We didn't watched TV' → sau didn't không chia V-ed",
          "❌ Sai: 'We not watch' → thiếu trợ động từ didn't"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "I / usually / have / bread and milk / breakfast /.//",
        cues_segments: [
          { text: "I / " },
          { text: "usually", tooltip: { vi: "thường xuyên", ipa: "ˈjuːʒuəli" } },
          { text: " / have / " },
          { text: "bread", tooltip: { vi: "bánh mì", ipa: "bred" } },
          { text: " and milk / breakfast /.//" }
        ],
        correct_sentence: "I usually have bread and milk for breakfast.",
        accepted_answers: [
          "I usually have bread and milk for breakfast.",
          "i usually have bread and milk for breakfast"
        ],
        structure_vi: "S + usually + have + đồ ăn + for breakfast",
        grammar_notes: [
          "✅ Dùng giới từ 'for' trước các bữa ăn: for breakfast, for lunch, for dinner",
          "✅ Trạng từ tần suất 'usually' đứng trước động từ 'have'"
        ],
        vocab_notes: [
          { word: "have for breakfast", vi: "ăn sáng món gì", ipa: "hæv fɔː ˈbrekfəst" },
          { word: "bread", vi: "bánh mì", ipa: "bred" }
        ],
        common_mistakes: [
          "❌ Sai: 'have bread and milk to breakfast' → dùng sai giới từ 'to', phải dùng 'for'",
          "❌ Sai: 'I have usually' → 'usually' phải đứng trước động từ thường"
        ]
      },
      {
        display_cues: "there / be / many / interesting books / our school library /.//",
        cues_segments: [
          { text: "there / be / many / " },
          { text: "interesting", tooltip: { vi: "thú vị", ipa: "ˈɪntrəstɪŋ" } },
          { text: " books / our school " },
          { text: "library", tooltip: { vi: "thư viện", ipa: "ˈlaɪbrəri" } },
          { text: " /.//" }
        ],
        correct_sentence: "There are many interesting books in our school library.",
        accepted_answers: [
          "There are many interesting books in our school library.",
          "there are many interesting books in our school library"
        ],
        structure_vi: "There are + số lượng/many + danh từ số nhiều + in + nơi chốn",
        grammar_notes: [
          "✅ 'books' là danh từ số nhiều đếm được, nên dùng 'There are'",
          "✅ Giới từ 'in' dùng trước một không gian như thư viện (in our school library)"
        ],
        vocab_notes: [
          { word: "library", vi: "thư viện", ipa: "ˈlaɪbrəri" },
          { word: "interesting", vi: "thú vị, hay", ipa: "ˈɪntrəstɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'There is many interesting books' → 'books' số nhiều phải dùng 'are'",
          "❌ Sai: 'at our school library' → dùng 'in' tự nhiên hơn khi nói về đồ vật nằm bên trong thư viện"
        ]
      },
      {
        display_cues: "he / play / football / his classmates / yesterday afternoon /.//",
        cues_segments: [
          { text: "he / play / football / his " },
          { text: "classmates", tooltip: { vi: "bạn cùng lớp (số nhiều)", ipa: "ˈklɑːsmeɪts" } },
          { text: " / yesterday afternoon /.//" }
        ],
        correct_sentence: "He played football with his classmates yesterday afternoon.",
        accepted_answers: [
          "He played football with his classmates yesterday afternoon.",
          "he played football with his classmates yesterday afternoon"
        ],
        structure_vi: "S + V(quá khứ) + O + with + người + thời gian",
        grammar_notes: [
          "✅ Dấu hiệu 'yesterday afternoon' → thì quá khứ đơn, động từ play thêm -ed thành 'played'",
          "✅ Dùng giới từ 'with' (với) để chỉ việc chơi cùng ai đó"
        ],
        vocab_notes: [
          { word: "classmate", vi: "bạn cùng lớp", ipa: "ˈklɑːsmeɪt" },
          { word: "yesterday afternoon", vi: "chiều hôm qua", ipa: "ˈjestədeɪ ˌɑːftəˈnuːn" }
        ],
        common_mistakes: [
          "❌ Sai: 'He play football' → sai thì, chưa chia quá khứ",
          "❌ Sai: 'played football his classmates' → thiếu giới từ 'with'"
        ]
      }
    ]
  },
  {
    id: "WRITING-EASY-GRADE4-P2",
    title: "Writing — Dễ — Lớp 4-5 — Bài 2",
    grade_min: 4,
    grade_max: 5,
    grade_target: "4-5",
    sec1: [
      {
        display_cues: "likes / collecting stamps / Lan / reading comic books / and /.//",
        cues_segments: [
          { text: "likes / " },
          { text: "collecting", tooltip: { vi: "sưu tầm", ipa: "kəˈlektɪŋ" } },
          { text: " " },
          { text: "stamps", tooltip: { vi: "tem (thư)", ipa: "stæmps" } },
          { text: " / Lan / reading " },
          { text: "comic books", tooltip: { vi: "truyện tranh", ipa: "ˈkɒmɪk bʊks" } },
          { text: " / and /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["Lan", "likes", "collecting stamps", "and", "reading comic books"],
        correct_sentence: "Lan likes collecting stamps and reading comic books.",
        structure_vi: "S + likes + V-ing + and + V-ing",
        grammar_notes: [
          "✅ Sau động từ chỉ sở thích (like, love, enjoy), động từ khác phải ở dạng V-ing",
          "✅ Từ nối 'and' (và) dùng để nối 2 hành động song song (collecting và reading)"
        ],
        vocab_notes: [
          { word: "collect stamps", vi: "sưu tầm tem", ipa: "kəˈlekt stæmps" },
          { word: "comic book", vi: "truyện tranh", ipa: "ˈkɒmɪk bʊk" }
        ],
        common_mistakes: [
          "❌ Sai: 'Lan like collecting' → Lan là số ít, động từ like phải thêm 's'",
          "❌ Sai: 'likes collect stamps' → sau like phải dùng V-ing"
        ]
      },
      {
        display_cues: "are / the children / in the park / flying kites / now /.//",
        cues_segments: [
          { text: "are / the children / in the park / " },
          { text: "flying kites", tooltip: { vi: "thả diều", ipa: "ˈflaɪɪŋ kaɪts" } },
          { text: " / now /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["the children", "are", "flying kites", "in the park", "now"],
        correct_sentence: "The children are flying kites in the park now.",
        structure_vi: "S + am/is/are + V-ing + nơi chốn + thời gian",
        grammar_notes: [
          "✅ Dấu hiệu 'now' (bây giờ) → thì Hiện tại tiếp diễn",
          "✅ 'The children' (những đứa trẻ) là số nhiều → dùng to be 'are'"
        ],
        vocab_notes: [
          { word: "children", vi: "những đứa trẻ", ipa: "ˈtʃɪldrən" },
          { word: "fly a kite", vi: "thả diều", ipa: "flaɪ ə kaɪt" }
        ],
        common_mistakes: [
          "❌ Sai: 'The children is flying' → children là số nhiều, phải dùng are",
          "❌ Sai: 'flying kites now in the park' → nơi chốn thường đứng trước thời gian"
        ]
      },
      {
        display_cues: "did you / in the countryside / your grandparents / visit / last summer /?//",
        cues_segments: [
          { text: "did you / in the " },
          { text: "countryside", tooltip: { vi: "vùng quê", ipa: "ˈkʌntrisaɪd" } },
          { text: " / your " },
          { text: "grandparents", tooltip: { vi: "ông bà", ipa: "ˈɡrænpeərənts" } },
          { text: " / visit / last summer /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["did you", "visit", "your grandparents", "in the countryside", "last summer"],
        correct_sentence: "Did you visit your grandparents in the countryside last summer?",
        structure_vi: "Did + S + V(nguyên mẫu) + O + nơi chốn + thời gian?",
        grammar_notes: [
          "✅ Đây là câu hỏi thì quá khứ đơn, ta đảo trợ động từ 'Did' lên đầu câu",
          "✅ Sau 'Did', động từ 'visit' giữ nguyên không thêm -ed"
        ],
        vocab_notes: [
          { word: "visit", vi: "thăm", ipa: "ˈvɪzɪt" },
          { word: "last summer", vi: "mùa hè năm ngoái", ipa: "lɑːst ˈsʌmər" }
        ],
        common_mistakes: [
          "❌ Sai: 'Did you visited' → đã có did thì động từ không chia nữa",
          "❌ Sai: 'You did visit' → câu hỏi phải đưa trợ động từ ra đầu"
        ]
      },
      {
        display_cues: "wants to be / she / because / she loves helping people / a doctor /.//",
        cues_segments: [
          { text: "wants to be / she / " },
          { text: "because", tooltip: { vi: "bởi vì", ipa: "bɪˈkɒz" } },
          { text: " / she loves " },
          { text: "helping", tooltip: { vi: "giúp đỡ", ipa: "ˈhelpɪŋ" } },
          { text: " people / a doctor /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["she", "wants to be", "a doctor", "because", "she loves helping people"],
        correct_sentence: "She wants to be a doctor because she loves helping people.",
        structure_vi: "S + wants to be + nghề nghiệp + because + S + V",
        grammar_notes: [
          "✅ Cấu trúc chỉ ước mơ nghề nghiệp: 'want to be a/an + noun'",
          "✅ Sau 'love', động từ dùng V-ing ('helping')"
        ],
        vocab_notes: [
          { word: "want to be", vi: "muốn trở thành", ipa: "wɒnt tʊ biː" },
          { word: "help people", vi: "giúp đỡ mọi người", ipa: "help ˈpiːpəl" }
        ],
        common_mistakes: [
          "❌ Sai: 'wants be a doctor' → thiếu 'to' sau want",
          "❌ Sai: 'because she love' → she là số ít, love phải thêm s"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "we / go / the cinema / twice a month / Sundays /.//",
        cues_segments: [
          { text: "we / go / the " },
          { text: "cinema", tooltip: { vi: "rạp chiếu phim", ipa: "ˈsɪnəmə" } },
          { text: " / " },
          { text: "twice", tooltip: { vi: "hai lần", ipa: "twaɪs" } },
          { text: " a month / Sundays /.//" }
        ],
        correct_sentence: "We go to the cinema twice a month on Sundays.",
        accepted_answers: [
          "We go to the cinema twice a month on Sundays.",
          "we go to the cinema twice a month on Sundays"
        ],
        structure_vi: "S + go to + nơi chốn + tần suất + on + thứ",
        grammar_notes: [
          "✅ Cụm từ cố định: 'go to the cinema' (đi xem phim)",
          "✅ Dùng giới từ 'on' trước các thứ trong tuần (on Sundays)"
        ],
        vocab_notes: [
          { word: "twice a month", vi: "hai lần một tháng", ipa: "twaɪs ə mʌnθ" },
          { word: "cinema", vi: "rạp chiếu phim", ipa: "ˈsɪnəmə" }
        ],
        common_mistakes: [
          "❌ Sai: 'go the cinema' → thiếu giới từ 'to'",
          "❌ Sai: 'in Sundays' → đi với thứ phải dùng 'on'"
        ]
      },
      {
        display_cues: "my father / be / listen / music / the living room /.//",
        cues_segments: [
          { text: "my father / be / listen / music / the " },
          { text: "living room", tooltip: { vi: "phòng khách", ipa: "ˈlɪvɪŋ ruːm" } },
          { text: " /.//" }
        ],
        correct_sentence: "My father is listening to music in the living room.",
        accepted_answers: [
          "My father is listening to music in the living room.",
          "my father is listening to music in the living room"
        ],
        structure_vi: "S + is/am/are + V-ing + giới từ + O + nơi chốn",
        grammar_notes: [
          "✅ Câu mô tả hành động đang diễn ra (chia tiếp diễn 'is listening')",
          "✅ Động từ 'listen' luôn đi kèm giới từ 'to' (listen to music)",
          "✅ 'in the living room' (trong phòng khách) dùng giới từ 'in'"
        ],
        vocab_notes: [
          { word: "listen to music", vi: "nghe nhạc", ipa: "ˈlɪsən tʊ ˈmjuːzɪk" },
          { word: "living room", vi: "phòng khách", ipa: "ˈlɪvɪŋ ruːm" }
        ],
        common_mistakes: [
          "❌ Sai: 'is listening music' → thiếu giới từ 'to'",
          "❌ Sai: 'are listening' → 'my father' là số ít nên phải dùng 'is'"
        ]
      },
      {
        display_cues: "what subject / you / like / best / school /?//",
        cues_segments: [
          { text: "what " },
          { text: "subject", tooltip: { vi: "môn học", ipa: "ˈsʌbdʒɪkt" } },
          { text: " / you / like / best / school /?//" }
        ],
        correct_sentence: "What subject do you like best at school?",
        accepted_answers: [
          "What subject do you like best at school?",
          "what subject do you like best at school"
        ],
        structure_vi: "What subject + do + S + like best + at school?",
        grammar_notes: [
          "✅ Câu hỏi với từ để hỏi 'What subject', phải mượn trợ động từ 'do' đứng trước chủ ngữ 'you'",
          "✅ 'at school' (ở trường) dùng giới từ 'at'"
        ],
        vocab_notes: [
          { word: "subject", vi: "môn học", ipa: "ˈsʌbdʒɪkt" },
          { word: "like best", vi: "thích nhất", ipa: "laɪk best" }
        ],
        common_mistakes: [
          "❌ Sai: 'What subject you like' → thiếu trợ động từ 'do'",
          "❌ Sai: 'in school' → dùng 'at school' sẽ chuẩn và phổ biến hơn"
        ]
      }
    ]
  },
  {
    id: "WRITING-EASY-GRADE4-P3",
    title: "Writing — Dễ — Lớp 4-5 — Bài 3",
    grade_min: 4,
    grade_max: 5,
    grade_target: "4-5",
    sec1: [
      {
        display_cues: "was / and sunny / it / very hot / in Hanoi yesterday /.//",
        cues_segments: [
          { text: "was / and " },
          { text: "sunny", tooltip: { vi: "có nắng", ipa: "ˈsʌni" } },
          { text: " / it / very hot / in Hanoi yesterday /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["it", "was", "very hot", "and sunny", "in Hanoi yesterday"],
        correct_sentence: "It was very hot and sunny in Hanoi yesterday.",
        structure_vi: "It + was + adj + and + adj + nơi chốn + thời gian",
        grammar_notes: [
          "✅ Chủ ngữ giả 'It' dùng để nói về thời tiết",
          "✅ Dấu hiệu 'yesterday' (hôm qua) → động từ to be chia quá khứ là 'was'"
        ],
        vocab_notes: [
          { word: "sunny", vi: "có nắng", ipa: "ˈsʌni" },
          { word: "hot", vi: "nóng", ipa: "hɒt" }
        ],
        common_mistakes: [
          "❌ Sai: 'It is very hot' → có yesterday nên phải dùng 'was'"
        ]
      },
      {
        display_cues: "are going to / Ha Long Bay / we / next week / visit /.//",
        cues_segments: [
          { text: "are going to / Ha Long Bay / we / next week / " },
          { text: "visit", tooltip: { vi: "thăm quan", ipa: "ˈvɪzɪt" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["we", "are going to", "visit", "Ha Long Bay", "next week"],
        correct_sentence: "We are going to visit Ha Long Bay next week.",
        structure_vi: "S + be going to + V(nguyên mẫu) + nơi chốn + thời gian",
        grammar_notes: [
          "✅ Dấu hiệu 'next week' (tuần tới) → thì Tương lai gần 'be going to'",
          "✅ Sau 'be going to' luôn là động từ nguyên mẫu ('visit')"
        ],
        vocab_notes: [
          { word: "be going to", vi: "sắp sửa, dự định", ipa: "biː ˈɡəʊɪŋ tʊ" }
        ],
        common_mistakes: [
          "❌ Sai: 'We are going to visiting' → sau going to phải là V nguyên mẫu"
        ]
      },
      {
        display_cues: "didn't / they / it rained heavily / because / go camping /.//",
        cues_segments: [
          { text: "didn't / they / it rained " },
          { text: "heavily", tooltip: { vi: "nặng hạt, to", ipa: "ˈhevɪli" } },
          { text: " / because / go " },
          { text: "camping", tooltip: { vi: "cắm trại", ipa: "ˈkæmpɪŋ" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["they", "didn't", "go camping", "because", "it rained heavily"],
        correct_sentence: "They didn't go camping because it rained heavily.",
        structure_vi: "S + didn't + V + because + S + V(quá khứ)",
        grammar_notes: [
          "✅ Quá khứ đơn: mệnh đề kết quả 'didn't go', mệnh đề nguyên nhân (sau because) 'rained'",
          "✅ 'heavily' là trạng từ bổ nghĩa cho động từ 'rained' (mưa lớn)"
        ],
        vocab_notes: [
          { word: "rain heavily", vi: "mưa to", ipa: "reɪn ˈhevɪli" },
          { word: "go camping", vi: "đi cắm trại", ipa: "ɡəʊ ˈkæmpɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'because it heavy rain' → sai từ loại, phải dùng động từ rained + trạng từ heavily"
        ]
      },
      {
        display_cues: "we / maths and English / on Mondays / have / and Thursdays /.//",
        cues_segments: [
          { text: "we / maths and English / on Mondays / have / and Thursdays /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["we", "have", "maths and English", "on Mondays", "and Thursdays"],
        correct_sentence: "We have maths and English on Mondays and Thursdays.",
        structure_vi: "S + have + môn học + on + các thứ",
        grammar_notes: [
          "✅ 'Mondays' và 'Thursdays' thêm 's' chỉ thói quen lặp lại hàng tuần",
          "✅ Giới từ 'on' dùng trước các thứ trong tuần"
        ],
        vocab_notes: [
          { word: "maths", vi: "môn Toán", ipa: "mæθs" }
        ],
        common_mistakes: [
          "❌ Sai: 'in Mondays' → các thứ trong tuần dùng giới từ 'on'"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "you / should / wear / warm coat / because / it / cold / outside /.//",
        cues_segments: [
          { text: "you / should / wear / warm " },
          { text: "coat", tooltip: { vi: "áo khoác", ipa: "kəʊt" } },
          { text: " / because / it / cold / outside /.//" }
        ],
        correct_sentence: "You should wear a warm coat because it is cold outside.",
        accepted_answers: [
          "You should wear a warm coat because it is cold outside.",
          "you should wear a warm coat because it is cold outside"
        ],
        structure_vi: "S + should + V(nguyên mẫu) + O + because + It is + adj",
        grammar_notes: [
          "✅ Lời khuyên: dùng 'should' + V nguyên mẫu ('wear')",
          "✅ Danh từ đếm được số ít 'coat' cần có mạo từ 'a' đứng trước cụm tính từ (a warm coat)",
          "✅ Thời tiết: 'it is cold'"
        ],
        vocab_notes: [
          { word: "warm coat", vi: "áo khoác ấm", ipa: "wɔːm kəʊt" },
          { word: "outside", vi: "bên ngoài", ipa: "ˌaʊtˈsaɪd" }
        ],
        common_mistakes: [
          "❌ Sai: 'wear warm coat' → thiếu mạo từ 'a'",
          "❌ Sai: 'because it cold' → thiếu động từ to be 'is'"
        ]
      },
      {
        display_cues: "what / the weather / like / Ho Chi Minh City / today /?//",
        cues_segments: [
          { text: "what / the " },
          { text: "weather", tooltip: { vi: "thời tiết", ipa: "ˈweðər" } },
          { text: " / like / Ho Chi Minh City / today /?//" }
        ],
        correct_sentence: "What is the weather like in Ho Chi Minh City today?",
        accepted_answers: [
          "What is the weather like in Ho Chi Minh City today?",
          "what is the weather like in ho chi minh city today"
        ],
        structure_vi: "What is the weather like + in + nơi chốn + thời gian?",
        grammar_notes: [
          "✅ Cấu trúc hỏi thời tiết: 'What is the weather like?'",
          "✅ Tên thành phố đi kèm giới từ 'in' (in Ho Chi Minh City)"
        ],
        vocab_notes: [
          { word: "weather", vi: "thời tiết", ipa: "ˈweðər" }
        ],
        common_mistakes: [
          "❌ Sai: 'What the weather like' → thiếu động từ to be 'is'",
          "❌ Sai: 'How is the weather like' → Hỏi How thì không có like, What thì có like"
        ]
      },
      {
        display_cues: "my mother / buy / a new dress / me / yesterday /.//",
        cues_segments: [
          { text: "my mother / buy / a new " },
          { text: "dress", tooltip: { vi: "chiếc váy", ipa: "dres" } },
          { text: " / me / yesterday /.//" }
        ],
        correct_sentence: "My mother bought a new dress for me yesterday.",
        accepted_answers: [
          "My mother bought a new dress for me yesterday.",
          "my mother bought a new dress for me yesterday",
          "My mother bought me a new dress yesterday."
        ],
        structure_vi: "S + bought + vật + for + người + thời gian",
        grammar_notes: [
          "✅ Quá khứ của 'buy' là 'bought'",
          "✅ Cấu trúc mua cho ai cái gì: buy something FOR someone (bought a dress for me)"
        ],
        vocab_notes: [
          { word: "bought", vi: "đã mua (quá khứ của buy)", ipa: "bɔːt" },
          { word: "dress", vi: "cái váy", ipa: "dres" }
        ],
        common_mistakes: [
          "❌ Sai: 'buyed' → buy là động từ bất quy tắc, quá khứ là bought",
          "❌ Sai: 'bought a new dress to me' → dùng giới từ 'for' mới chính xác"
        ]
      }
    ]
  },
  {
    id: "WRITING-EASY-GRADE5-P1",
    title: "Writing — Dễ — Lớp 5-6 — Bài 1",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "will live / I think / on the moon / people / in the future /.//",
        cues_segments: [
          { text: "will live / I think / on the " },
          { text: "moon", tooltip: { vi: "mặt trăng", ipa: "muːn" } },
          { text: " / people / in the " },
          { text: "future", tooltip: { vi: "tương lai", ipa: "ˈfjuːtʃər" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["I think", "people", "will live", "on the moon", "in the future"],
        correct_sentence: "I think people will live on the moon in the future.",
        structure_vi: "I think + S + will + V + giới từ + nơi chốn + thời gian",
        grammar_notes: [
          "✅ Dự đoán tương lai dùng 'will' + V nguyên mẫu",
          "✅ 'on the moon' (trên mặt trăng) dùng giới từ 'on' và mạo từ 'the'"
        ],
        vocab_notes: [
          { word: "in the future", vi: "trong tương lai", ipa: "ɪn ðə ˈfjuːtʃər" }
        ],
        common_mistakes: [
          "❌ Sai: 'will living' → sau will phải dùng V nguyên mẫu"
        ]
      },
      {
        display_cues: "what / this weekend / will you do / with your family /?//",
        cues_segments: [
          { text: "what / this weekend / will you do / with your " },
          { text: "family", tooltip: { vi: "gia đình", ipa: "ˈfæməli" } },
          { text: " /?//" }
        ],
        template: "{0} {1} {2} {3}?",
        word_bank: ["what", "will you do", "with your family", "this weekend"],
        correct_sentence: "What will you do with your family this weekend?",
        structure_vi: "What + will + S + do + with + người + thời gian?",
        grammar_notes: [
          "✅ Câu hỏi thì tương lai đơn với từ để hỏi: What + will + S + V?",
          "✅ Trạng ngữ chỉ thời gian 'this weekend' đặt ở cuối câu"
        ],
        vocab_notes: [
          { word: "this weekend", vi: "cuối tuần này", ipa: "ðɪs ˌwiːkˈend" }
        ],
        common_mistakes: [
          "❌ Sai: 'What you will do' → câu hỏi phải đảo 'will' lên trước chủ ngữ 'you'"
        ]
      },
      {
        display_cues: "he / than / is / his older brother / taller /.//",
        cues_segments: [
          { text: "he / than / is / his older " },
          { text: "brother", tooltip: { vi: "anh trai", ipa: "ˈbrʌðər" } },
          { text: " / taller /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["he", "is", "taller", "than", "his older brother"],
        correct_sentence: "He is taller than his older brother.",
        structure_vi: "S1 + is + adj-er + than + S2",
        grammar_notes: [
          "✅ Cấu trúc so sánh hơn với tính từ ngắn (tall): thêm đuôi '-er' thành 'taller'",
          "✅ Bắt buộc có từ 'than' (hơn) nối giữa hai đối tượng"
        ],
        vocab_notes: [
          { word: "tall", vi: "cao", ipa: "tɔːl" },
          { word: "older brother", vi: "anh trai", ipa: "ˈoʊldər ˈbrʌðər" }
        ],
        common_mistakes: [
          "❌ Sai: 'He is more tall' → tall là tính từ ngắn nên dùng đuôi -er, không dùng 'more'"
        ]
      },
      {
        display_cues: "the museum / and / we visited / saw / many old things /.//",
        cues_segments: [
          { text: "the " },
          { text: "museum", tooltip: { vi: "bảo tàng", ipa: "mjuːˈziːəm" } },
          { text: " / and / we visited / saw / many old things /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["we visited", "the museum", "and", "saw", "many old things"],
        correct_sentence: "We visited the museum and saw many old things.",
        structure_vi: "S + V1(ed) + O1 + and + V2(bất quy tắc) + O2",
        grammar_notes: [
          "✅ Cả hai hành động đều ở quá khứ, nối với nhau bằng 'and'",
          "✅ 'saw' là dạng quá khứ của động từ bất quy tắc 'see'"
        ],
        vocab_notes: [
          { word: "museum", vi: "bảo tàng", ipa: "mjuːˈziːəm" },
          { word: "saw", vi: "đã nhìn thấy (quá khứ của see)", ipa: "sɔː" }
        ],
        common_mistakes: [
          "❌ Sai: 'we visited the museum and see' → hai vế phải cùng thì quá khứ"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "they / watch / a movie / when / the phone / ring /.//",
        cues_segments: [
          { text: "they / watch / a movie / when / the phone / " },
          { text: "ring", tooltip: { vi: "rung chuông", ipa: "rɪŋ" } },
          { text: " /.//" }
        ],
        correct_sentence: "They were watching a movie when the phone rang.",
        accepted_answers: [
          "They were watching a movie when the phone rang.",
          "they were watching a movie when the phone rang"
        ],
        structure_vi: "S + were/was V-ing + when + S + V(quá khứ đơn)",
        grammar_notes: [
          "✅ Mệnh đề Quá khứ tiếp diễn (were watching) diễn tả hành động ĐANG xảy ra",
          "✅ Mệnh đề Quá khứ đơn (rang) diễn tả hành động xen vào",
          "✅ Quá khứ của 'ring' là 'rang'"
        ],
        vocab_notes: [
          { word: "rang", vi: "đã reo (chuông)", ipa: "ræŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'They watched a movie when the phone was ringing' → ngược thì. Hành động dài (xem) dùng tiếp diễn, hành động ngắn (chuông reo) dùng đơn."
        ]
      },
      {
        display_cues: "will / you / go / the beach / your summer holiday /?//",
        cues_segments: [
          { text: "will / you / go / the " },
          { text: "beach", tooltip: { vi: "bãi biển", ipa: "biːtʃ" } },
          { text: " / your summer " },
          { text: "holiday", tooltip: { vi: "kỳ nghỉ", ipa: "ˈhɒlədeɪ" } },
          { text: " /?//" }
        ],
        correct_sentence: "Will you go to the beach for your summer holiday?",
        accepted_answers: [
          "Will you go to the beach for your summer holiday?",
          "will you go to the beach for your summer holiday"
        ],
        structure_vi: "Will + S + go to + nơi chốn + for + sự kiện/dịp?",
        grammar_notes: [
          "✅ Giới từ 'for' dùng để chỉ mục đích (cho kỳ nghỉ hè)",
          "✅ Cụm từ cố định 'go to the beach'"
        ],
        vocab_notes: [
          { word: "summer holiday", vi: "kỳ nghỉ hè", ipa: "ˈsʌmər ˈhɒlədeɪ" }
        ],
        common_mistakes: [
          "❌ Sai: 'go the beach' → thiếu giới từ 'to'",
          "❌ Sai: 'in your summer holiday' → thường dùng 'for' với ý nghĩa 'dành cho kỳ nghỉ'"
        ]
      },
      {
        display_cues: "this book / be / interesting / than / that one /.//",
        cues_segments: [
          { text: "this book / be / " },
          { text: "interesting", tooltip: { vi: "thú vị", ipa: "ˈɪntrəstɪŋ" } },
          { text: " / than / that one /.//" }
        ],
        correct_sentence: "This book is more interesting than that one.",
        accepted_answers: [
          "This book is more interesting than that one.",
          "this book is more interesting than that one"
        ],
        structure_vi: "S1 + is + more + tính từ dài + than + S2",
        grammar_notes: [
          "✅ 'interesting' là tính từ dài (3 âm tiết) nên cấu trúc so sánh hơn dùng 'more interesting'",
          "✅ Bắt buộc có 'than' để so sánh"
        ],
        vocab_notes: [
          { word: "more interesting", vi: "thú vị hơn", ipa: "mɔːr ˈɪntrəstɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'is interestinger' → tính từ dài không thêm đuôi -er",
          "❌ Sai: 'is more interesting that' → chữ dùng để so sánh là 'than', không phải 'that'"
        ]
      }
    ]
  },
  {
    id: "WRITING-EASY-GRADE5-P2",
    title: "Writing — Dễ — Lớp 5-6 — Bài 2",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "has a headache / my sister / needs to take a rest / and / she /.//",
        cues_segments: [
          { text: "has a " },
          { text: "headache", tooltip: { vi: "đau đầu", ipa: "ˈhedeɪk" } },
          { text: " / my sister / needs to take a " },
          { text: "rest", tooltip: { vi: "nghỉ ngơi", ipa: "rest" } },
          { text: " / and / she /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["my sister", "has a headache", "and", "she", "needs to take a rest"],
        correct_sentence: "My sister has a headache and she needs to take a rest.",
        structure_vi: "S + has a bệnh + and + S + needs to + V",
        grammar_notes: [
          "✅ Dùng 'have/has a + tên bệnh' để mô tả triệu chứng bệnh",
          "✅ 'take a rest' là cụm từ cố định nghĩa là 'nghỉ ngơi'"
        ],
        vocab_notes: [
          { word: "headache", vi: "đau đầu", ipa: "ˈhedeɪk" },
          { word: "take a rest", vi: "nghỉ ngơi", ipa: "teɪk ə rest" }
        ],
        common_mistakes: [
          "❌ Sai: 'have a headache' → my sister số ít nên dùng 'has'"
        ]
      },
      {
        display_cues: "with you / what's / Peter / the matter /?//",
        cues_segments: [
          { text: "with you / what's / Peter / the " },
          { text: "matter", tooltip: { vi: "vấn đề", ipa: "ˈmætər" } },
          { text: " /?//" }
        ],
        template: "{0} {1} {2}, {3}?",
        word_bank: ["what's", "the matter", "with you", "Peter"],
        correct_sentence: "What's the matter with you, Peter?",
        structure_vi: "What's the matter + with + người?",
        grammar_notes: [
          "✅ Mẫu câu hỏi thăm sức khỏe phổ biến: 'What's the matter with you?'",
          "✅ Tên riêng ở cuối câu hô gọi phải được phân tách bằng dấu phẩy"
        ],
        vocab_notes: [
          { word: "matter", vi: "vấn đề, chuyện gì", ipa: "ˈmætər" }
        ],
        common_mistakes: [
          "❌ Sai: 'What the matter' → thiếu động từ 's (is)"
        ]
      },
      {
        display_cues: "to check his teeth / goes to the dentist / he / twice a year /.//",
        cues_segments: [
          { text: "to check his teeth / goes to the " },
          { text: "dentist", tooltip: { vi: "nha sĩ", ipa: "ˈdentɪst" } },
          { text: " / he / " },
          { text: "twice", tooltip: { vi: "hai lần", ipa: "twaɪs" } },
          { text: " a year /.//" }
        ],
        template: "{0} {1} {2} {3}.",
        word_bank: ["he", "goes to the dentist", "twice a year", "to check his teeth"],
        correct_sentence: "He goes to the dentist twice a year to check his teeth.",
        structure_vi: "S + goes to + nơi + tần suất + to-V (chỉ mục đích)",
        grammar_notes: [
          "✅ 'twice a year' là cụm từ chỉ tần suất (2 lần một năm)",
          "✅ Cấu trúc To-V (to check) dùng để chỉ mục đích của hành động đi nha sĩ"
        ],
        vocab_notes: [
          { word: "dentist", vi: "nha sĩ", ipa: "ˈdentɪst" },
          { word: "check", vi: "kiểm tra", ipa: "tʃek" }
        ],
        common_mistakes: [
          "❌ Sai: 'for check his teeth' → chỉ mục đích phải dùng 'to + V' (to check)"
        ]
      },
      {
        display_cues: "didn't / yesterday / they / because they had a fever / go to school /.//",
        cues_segments: [
          { text: "didn't / yesterday / they / because they had a " },
          { text: "fever", tooltip: { vi: "cơn sốt", ipa: "ˈfiːvər" } },
          { text: " / go to school /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["they", "didn't", "go to school", "yesterday", "because they had a fever"],
        correct_sentence: "They didn't go to school yesterday because they had a fever.",
        structure_vi: "S + didn't + V + thời gian + because + S + had a bệnh",
        grammar_notes: [
          "✅ 'didn't go' và 'had' đều ở thì quá khứ vì có 'yesterday'",
          "✅ 'have a fever' (bị sốt) chuyển thành quá khứ là 'had a fever'"
        ],
        vocab_notes: [
          { word: "fever", vi: "sốt", ipa: "ˈfiːvər" }
        ],
        common_mistakes: [
          "❌ Sai: 'didn't went' → sau didn't phải dùng V nguyên thể (go)"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "you / should not / eat / too much candy / because / it / bad / your teeth /.//",
        cues_segments: [
          { text: "you / should not / eat / too much " },
          { text: "candy", tooltip: { vi: "kẹo", ipa: "ˈkændi" } },
          { text: " / because / it / bad / your " },
          { text: "teeth", tooltip: { vi: "răng (số nhiều)", ipa: "tiːθ" } },
          { text: " /.//" }
        ],
        correct_sentence: "You should not eat too much candy because it is bad for your teeth.",
        accepted_answers: [
          "You should not eat too much candy because it is bad for your teeth.",
          "You shouldn't eat too much candy because it is bad for your teeth."
        ],
        structure_vi: "S + should not + V + O + because + it is bad for + N",
        grammar_notes: [
          "✅ Lời khuyên KHÔNG NÊN làm gì: should not (shouldn't) + V nguyên mẫu",
          "✅ 'be bad for' = có hại cho cái gì (ngược với 'be good for')"
        ],
        vocab_notes: [
          { word: "too much", vi: "quá nhiều", ipa: "tuː mʌtʃ" },
          { word: "bad for", vi: "có hại cho", ipa: "bæd fɔː" }
        ],
        common_mistakes: [
          "❌ Sai: 'bad to your teeth' → cấu trúc đúng là 'bad for'"
        ]
      },
      {
        display_cues: "you / should / drink / a lot of water / and / eat / fresh fruit /.//",
        cues_segments: [
          { text: "you / should / drink / a lot of water / and / eat / " },
          { text: "fresh", tooltip: { vi: "tươi, sạch", ipa: "freʃ" } },
          { text: " " },
          { text: "fruit", tooltip: { vi: "trái cây", ipa: "fruːt" } },
          { text: " /.//" }
        ],
        correct_sentence: "You should drink a lot of water and eat fresh fruit.",
        accepted_answers: [
          "You should drink a lot of water and eat fresh fruit.",
          "you should drink a lot of water and eat fresh fruit"
        ],
        structure_vi: "S + should + V1 + O1 + and + V2 + O2",
        grammar_notes: [
          "✅ Hai động từ 'drink' và 'eat' cùng chịu sự chi phối của 'should' nên đều giữ nguyên thể",
          "✅ 'a lot of' dùng được cho cả danh từ đếm được và không đếm được (water)"
        ],
        vocab_notes: [
          { word: "fresh fruit", vi: "trái cây tươi", ipa: "freʃ fruːt" }
        ],
        common_mistakes: [
          "❌ Sai: 'drink many water' → water không đếm được, dùng a lot of hoặc much, không dùng many"
        ]
      },
      {
        display_cues: "wash / your hands / before meals / be / a good habit /.//",
        cues_segments: [
          { text: "wash / your hands / " },
          { text: "before", tooltip: { vi: "trước khi", ipa: "bɪˈfɔː" } },
          { text: " " },
          { text: "meals", tooltip: { vi: "bữa ăn (số nhiều)", ipa: "miːlz" } },
          { text: " / be / a good " },
          { text: "habit", tooltip: { vi: "thói quen", ipa: "ˈhæbɪt" } },
          { text: " /.//" }
        ],
        correct_sentence: "Washing your hands before meals is a good habit.",
        accepted_answers: [
          "Washing your hands before meals is a good habit.",
          "washing your hands before meals is a good habit",
          "To wash your hands before meals is a good habit."
        ],
        structure_vi: "V-ing (làm chủ ngữ) + O + thời gian + is + cụm danh từ",
        grammar_notes: [
          "✅ Khi một hành động đóng vai trò Chủ Ngữ, ta phải dùng V-ing (Washing) hoặc To-V",
          "✅ V-ing làm chủ ngữ thì động từ to be luôn chia số ít ('is')"
        ],
        vocab_notes: [
          { word: "habit", vi: "thói quen", ipa: "ˈhæbɪt" },
          { word: "meals", vi: "bữa ăn", ipa: "miːlz" }
        ],
        common_mistakes: [
          "❌ Sai: 'Wash your hands is...' → 'Wash' là động từ thường, không thể đứng đầu làm chủ ngữ nếu chưa thêm đuôi -ing"
        ]
      }
    ]
  },
  {
    id: "WRITING-EASY-GRADE5-P3",
    title: "Writing — Dễ — Lớp 5-6 — Bài 3",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "more trees / we should plant / our environment / to protect /.//",
        cues_segments: [
          { text: "more trees / we should plant / our " },
          { text: "environment", tooltip: { vi: "môi trường", ipa: "ɪnˈvaɪrənmənt" } },
          { text: " / to " },
          { text: "protect", tooltip: { vi: "bảo vệ", ipa: "prəˈtekt" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3}.",
        word_bank: ["we should plant", "more trees", "to protect", "our environment"],
        correct_sentence: "We should plant more trees to protect our environment.",
        structure_vi: "S + should + V + O + to-V (mục đích) + O",
        grammar_notes: [
          "✅ Cấu trúc 'to + V nguyên thể' (to protect) dùng để chỉ mục đích",
          "✅ 'should plant' đưa ra lời khuyên"
        ],
        vocab_notes: [
          { word: "environment", vi: "môi trường", ipa: "ɪnˈvaɪrənmənt" },
          { word: "protect", vi: "bảo vệ", ipa: "prəˈtekt" }
        ],
        common_mistakes: [
          "❌ Sai: 'for protect' → mục đích phải dùng 'to protect'"
        ]
      },
      {
        display_cues: "into the river or the lake / don't / rubbish / throw /.//",
        cues_segments: [
          { text: "into the river or the lake / don't / " },
          { text: "rubbish", tooltip: { vi: "rác thải", ipa: "ˈrʌbɪʃ" } },
          { text: " / " },
          { text: "throw", tooltip: { vi: "vứt, ném", ipa: "θrəʊ" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3}.",
        word_bank: ["don't", "throw", "rubbish", "into the river or the lake"],
        correct_sentence: "Don't throw rubbish into the river or the lake.",
        structure_vi: "Don't + V(nguyên) + O + into + nơi chốn",
        grammar_notes: [
          "✅ Câu mệnh lệnh phủ định bắt đầu bằng 'Don't' + V nguyên mẫu",
          "✅ Giới từ 'into' mang nghĩa 'vào bên trong' (vứt rác vào dòng sông)"
        ],
        vocab_notes: [
          { word: "throw rubbish", vi: "vứt rác", ipa: "θrəʊ ˈrʌbɪʃ" },
          { word: "lake", vi: "hồ nước", ipa: "leɪk" }
        ],
        common_mistakes: [
          "❌ Sai: 'Not throw' → câu mệnh lệnh phủ định phải dùng 'Don't'"
        ]
      },
      {
        display_cues: "goes for a walk / my grandfather / in the park / every morning /.//",
        cues_segments: [
          { text: "goes for a walk / my " },
          { text: "grandfather", tooltip: { vi: "ông nội/ngoại", ipa: "ˈɡrænˌfɑːðər" } },
          { text: " / in the park / every morning /.//" }
        ],
        template: "{0} {1} {2} {3}.",
        word_bank: ["my grandfather", "goes for a walk", "in the park", "every morning"],
        correct_sentence: "My grandfather goes for a walk in the park every morning.",
        structure_vi: "S + V(s/es) + nơi chốn + thời gian",
        grammar_notes: [
          "✅ 'every morning' (mỗi sáng) là dấu hiệu thì Hiện tại đơn",
          "✅ 'grandfather' là ngôi 3 số ít nên 'go' thêm -es thành 'goes'"
        ],
        vocab_notes: [
          { word: "go for a walk", vi: "đi dạo", ipa: "ɡəʊ fɔːr ə wɔːk" }
        ],
        common_mistakes: [
          "❌ Sai: 'go for a walk' → thiếu chia động từ -es"
        ]
      },
      {
        display_cues: "how much / you / water / do / drink every day /?//",
        cues_segments: [
          { text: "how much / you / water / do / drink every day /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["how much", "water", "do", "you", "drink every day"],
        correct_sentence: "How much water do you drink every day?",
        structure_vi: "How much + danh từ không đếm được + do/does + S + V?",
        grammar_notes: [
          "✅ 'water' là danh từ không đếm được nên dùng từ để hỏi 'How much'",
          "✅ 'do' là trợ động từ đứng trước chủ ngữ 'you' trong câu hỏi"
        ],
        vocab_notes: [
          { word: "how much", vi: "bao nhiêu (không đếm được)", ipa: "haʊ mʌtʃ" }
        ],
        common_mistakes: [
          "❌ Sai: 'How many water' → water không đếm được, dùng how much"
        ]
      }
    ],
    sec2: [
      {
        display_cues: "turn off / the lights / when / you / leave / the room /.//",
        cues_segments: [
          { text: "turn off / the lights / when / you / " },
          { text: "leave", tooltip: { vi: "rời khỏi", ipa: "liːv" } },
          { text: " / the room /.//" }
        ],
        correct_sentence: "Turn off the lights when you leave the room.",
        accepted_answers: [
          "Turn off the lights when you leave the room.",
          "turn off the lights when you leave the room"
        ],
        structure_vi: "V(mệnh lệnh) + O + when + S + V + O",
        grammar_notes: [
          "✅ Mệnh đề đầu là câu mệnh lệnh khẳng định, bắt đầu bằng động từ nguyên mẫu (Turn off)",
          "✅ 'when' nối hai vế hành động chỉ thời điểm"
        ],
        vocab_notes: [
          { word: "turn off", vi: "tắt (đèn, máy móc)", ipa: "tɜːn ɒf" },
          { word: "leave", vi: "rời đi", ipa: "liːv" }
        ],
        common_mistakes: [
          "❌ Sai: 'Turn of' → sai chính tả, phải là 'off' (có 2 chữ f)"
        ]
      },
      {
        display_cues: "they / be going to / clean / the classroom / tomorrow afternoon /.//",
        cues_segments: [
          { text: "they / be going to / clean / the classroom / " },
          { text: "tomorrow", tooltip: { vi: "ngày mai", ipa: "təˈmɒrəʊ" } },
          { text: " afternoon /.//" }
        ],
        correct_sentence: "They are going to clean the classroom tomorrow afternoon.",
        accepted_answers: [
          "They are going to clean the classroom tomorrow afternoon.",
          "they are going to clean the classroom tomorrow afternoon"
        ],
        structure_vi: "S + am/is/are + going to + V(nguyên) + O + thời gian",
        grammar_notes: [
          "✅ 'tomorrow afternoon' → tương lai gần. Phải chia 'be' theo chủ ngữ 'They' thành 'are going to'",
          "✅ Sau 'be going to' là động từ nguyên mẫu (clean)"
        ],
        vocab_notes: [
          { word: "clean", vi: "dọn dẹp", ipa: "kliːn" },
          { word: "tomorrow afternoon", vi: "chiều mai", ipa: "təˈmɒrəʊ ˌɑːftəˈnuːn" }
        ],
        common_mistakes: [
          "❌ Sai: 'They be going to' → phải chia động từ to be thành 'are'"
        ]
      },
      {
        display_cues: "ride / a bike / be / good / your health / and / the environment /.//",
        cues_segments: [
          { text: "ride / a bike / be / " },
          { text: "good", tooltip: { vi: "tốt", ipa: "ɡʊd" } },
          { text: " / your " },
          { text: "health", tooltip: { vi: "sức khỏe", ipa: "helθ" } },
          { text: " / and / the " },
          { text: "environment", tooltip: { vi: "môi trường", ipa: "ɪnˈvaɪrənmənt" } },
          { text: " /.//" }
        ],
        correct_sentence: "Riding a bike is good for your health and the environment.",
        accepted_answers: [
          "Riding a bike is good for your health and the environment.",
          "riding a bike is good for your health and the environment",
          "To ride a bike is good for your health and the environment."
        ],
        structure_vi: "V-ing (chủ ngữ) + is + good for + N1 + and + N2",
        grammar_notes: [
          "✅ Hành động (ride) đứng đầu câu làm chủ ngữ thì phải thêm -ing thành 'Riding'",
          "✅ V-ing làm chủ ngữ luôn đi với to be số ít ('is')",
          "✅ 'good for' = tốt cho cái gì (ngược với bad for)"
        ],
        vocab_notes: [
          { word: "health", vi: "sức khỏe", ipa: "helθ" },
          { word: "environment", vi: "môi trường", ipa: "ɪnˈvaɪrənmənt" }
        ],
        common_mistakes: [
          "❌ Sai: 'Ride a bike is...' → sai ngữ pháp, Ride là động từ thường không thể làm chủ ngữ",
          "❌ Sai: 'good to your health' → sai giới từ, cấu trúc chuẩn là 'good for'"
        ]
      }
    ]
  }
];

function generateFile(data) {
  const json = {
    id: data.id,
    title: data.title,
    type: "writing",
    skill: "writing",
    difficulty: "easy",
    grade_min: data.grade_min,
    grade_max: data.grade_max,
    grade_target: data.grade_target,
    pathway: "lop6",
    subject: "tieng-anh",
    ui_language: "en",
    is_free: true,
    total_points: 14,
    instructions_vi: "Bài thi Writing gồm 2 phần. Phần I: Sắp xếp các cụm từ để tạo thành câu hoàn chỉnh. Phần II: Viết câu hoàn chỉnh dựa vào các từ gợi ý. Click vào các từ gạch chân chấm chấm để xem nghĩa.",
    sections: [
      {
        id: "sec-1",
        type: "rearrange",
        title: "I. Rearrange the groups of words in the correct order to make complete sentences.",
        points: 8,
        points_per_question: 2,
        instruction: "Sắp xếp các cụm từ theo đúng thứ tự để tạo thành câu hoàn chỉnh, đúng ngữ pháp. Chú ý từ viết hoa đứng đầu câu và dấu câu ở cuối.",
        example: {
          display_cues: "lives / my uncle / in a small village / near the river /.//",
          answer: "My uncle lives in a small village near the river."
        },
        questions: data.sec1.map((q, idx) => ({
          id: "q" + (idx + 1),
          type: "drag-drop-fill",
          display_cues: q.display_cues,
          cues_segments: q.cues_segments,
          template: q.template,
          word_bank: q.word_bank,
          correct: q.word_bank.slice().sort((a,b) => q.correct_sentence.toLowerCase().indexOf(a.toLowerCase()) - q.correct_sentence.toLowerCase().indexOf(b.toLowerCase())), 
          // Actually, correct array must perfectly match the sequence, I'll pass it directly
          correct: (() => {
             const lowerCorrect = q.correct_sentence.toLowerCase();
             return q.word_bank.slice().sort((a,b) => lowerCorrect.indexOf(a.toLowerCase()) - lowerCorrect.indexOf(b.toLowerCase()))
          })(),
          explanation: {
            correct_sentence: q.correct_sentence,
            structure_vi: q.structure_vi,
            grammar_notes: q.grammar_notes,
            vocab_notes: q.vocab_notes,
            common_mistakes: q.common_mistakes
          }
        }))
      },
      {
        id: "sec-2",
        type: "sentence-building",
        title: "II. Write complete sentences with the given cues. You must write NO MORE THAN fifteen words for each sentence.",
        points: 6,
        points_per_question: 2,
        instruction: "Viết câu hoàn chỉnh và đúng ngữ pháp dựa vào các từ gợi ý. Mỗi câu không được vượt quá 15 từ.",
        example: {
          display_cues: "there / be / a big garden / behind / our house /.//",
          answer: "There is a big garden behind our house."
        },
        questions: data.sec2.map((q, idx) => ({
          id: "q" + (idx + 5),
          type: "write-sentence",
          display_cues: q.display_cues,
          cues_segments: q.cues_segments,
          accepted_answers: q.accepted_answers,
          explanation: {
            correct_sentence: q.correct_sentence,
            structure_vi: q.structure_vi,
            grammar_notes: q.grammar_notes,
            vocab_notes: q.vocab_notes,
            common_mistakes: q.common_mistakes
          }
        }))
      }
    ]
  };

  // Fix correct order for sec1
  json.sections[0].questions.forEach((q, i) => {
    q.correct = DATA.find(d => d.id === data.id).sec1[i].word_bank.slice().sort((a,b) => {
       const sentence = DATA.find(d => d.id === data.id).sec1[i].correct_sentence.toLowerCase();
       // This sorting can be buggy if words overlap. Let's just manually define correct if needed.
       // Actually, my data object doesn't have 'correct' explicitly defined, I'll fix this manually after generation if needed, or I'll just change the data structure to include it.
    });
  });

  return json;
}

// I will fix the 'correct' field to be explicit
DATA.forEach(file => {
  file.sec1.forEach(q => {
     // I didn't include correct in DATA, so I'll create a quick function to extract it safely
     // Or just hardcode it here based on correct_sentence
     const words = q.correct_sentence.replace('.', '').split(' ');
     // We just match word_bank items against correct_sentence
     let sorted = [];
     let lowerSentence = q.correct_sentence.toLowerCase();
     let bank = [...q.word_bank];
     
     // Sorting bank based on position in sentence
     bank.sort((a, b) => lowerSentence.indexOf(a.toLowerCase()) - lowerSentence.indexOf(b.toLowerCase()));
     q.correct = bank;
  });
});

DATA.forEach(d => {
  const json = generateFile(d);
  // Re-assign the fixed correct array
  json.sections[0].questions.forEach((q, i) => {
     q.correct = d.sec1[i].correct;
  });
  
  const destPath = path.join(__dirname, '..', 'content', 'lop6', 'tieng-anh', 'writing', d.id + '.json');
  fs.writeFileSync(destPath, JSON.stringify(json, null, 2));
  console.log('Created:', destPath);
});
