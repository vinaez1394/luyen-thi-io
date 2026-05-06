import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA = [
  {
    id: "WRITING-MED-GRADE3-P1",
    title: "Writing — Trung bình — Lớp 3-4 — Bài 1",
    grade_min: 3,
    grade_max: 4,
    grade_target: "3-4",
    sec1: [
      {
        display_cues: "is / the kitchen / cooking / mother / in / my /.//",
        cues_segments: [
          { text: "is / the kitchen / " },
          { text: "cooking", tooltip: { vi: "đang nấu ăn", ipa: "ˈkʊkɪŋ" } },
          { text: " / mother / in / my /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["my", "mother", "is", "cooking", "in", "the kitchen"],
        correct_sentence: "My mother is cooking in the kitchen.",
        structure_vi: "S + is/are/am + V-ing + in + nơi chốn",
        grammar_notes: [
          "✅ 'My mother' là chủ ngữ số ít nên dùng 'is'.",
          "✅ Thì hiện tại tiếp diễn mô tả hành động đang xảy ra: 'is cooking'."
        ],
        vocab_notes: [
          { word: "cooking", vi: "nấu ăn", ipa: "ˈkʊkɪŋ" },
          { word: "kitchen", vi: "nhà bếp", ipa: "ˈkɪtʃɪn" }
        ],
        common_mistakes: [
          "❌ Sai: 'My mother cooking' → thiếu to be 'is'."
        ]
      },
      {
        display_cues: "do / you / what / have / today / subjects /?//",
        cues_segments: [
          { text: "do / you / what / have / today / " },
          { text: "subjects", tooltip: { vi: "môn học", ipa: "ˈsʌbdʒɪkts" } },
          { text: " /?//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}?",
        word_bank: ["what", "subjects", "do", "you", "have", "today"],
        correct_sentence: "What subjects do you have today?",
        structure_vi: "What subjects + do/does + S + have + thời gian?",
        grammar_notes: [
          "✅ Câu hỏi về môn học: 'What subjects' đứng đầu câu.",
          "✅ Mượn trợ động từ 'do' cho chủ ngữ 'you'."
        ],
        vocab_notes: [
          { word: "subjects", vi: "môn học", ipa: "ˈsʌbdʒɪkts" }
        ],
        common_mistakes: [
          "❌ Sai: 'What you have subjects' → từ để hỏi phải đi liền với danh từ 'What subjects'."
        ]
      },
      {
        display_cues: "I / monkeys / they / funny / are / because / like /.//",
        cues_segments: [
          { text: "I / monkeys / they / " },
          { text: "funny", tooltip: { vi: "buồn cười", ipa: "ˈfʌni" } },
          { text: " / are / " },
          { text: "because", tooltip: { vi: "bởi vì", ipa: "bɪˈkɒz" } },
          { text: " / like /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5} {6}.",
        word_bank: ["I", "like", "monkeys", "because", "they", "are", "funny"],
        correct_sentence: "I like monkeys because they are funny.",
        structure_vi: "S + like(s) + N + because + S + be + adj",
        grammar_notes: [
          "✅ 'because' (bởi vì) dùng để giải thích lý do thích một con vật.",
          "✅ Động từ to be đi với 'they' là 'are'."
        ],
        vocab_notes: [
          { word: "monkeys", vi: "những con khỉ", ipa: "ˈmʌŋkiz" },
          { word: "funny", vi: "vui nhộn, buồn cười", ipa: "ˈfʌni" }
        ],
        common_mistakes: [
          "❌ Sai: 'because they is funny' → 'they' phải đi với 'are'."
        ]
      },
      {
        display_cues: "would / some / you / like / milk /?//",
        cues_segments: [
          { text: "would / some / you / like / milk /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["would", "you", "like", "some", "milk"],
        correct_sentence: "Would you like some milk?",
        structure_vi: "Would you like + some + danh từ?",
        grammar_notes: [
          "✅ Cấu trúc dùng để mời ai đó món đồ ăn/đồ uống một cách lịch sự.",
          "✅ 'some' được dùng trong câu mời hoặc đề nghị mặc dù đây là câu hỏi."
        ],
        vocab_notes: [
          { word: "would like", vi: "muốn", ipa: "wʊd laɪk" }
        ],
        common_mistakes: [
          "❌ Sai: 'Do you like some milk?' → câu mời nên dùng 'Would you like'."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "my sister / be / read / a book / her room / now /.//",
        cues_segments: [
          { text: "my sister / be / read / a book / her room / now /.//" }
        ],
        correct_sentence: "My sister is reading a book in her room now.",
        accepted_answers: [
          "My sister is reading a book in her room now."
        ],
        structure_vi: "S + is/are/am + V-ing + O + in + nơi chốn + now",
        grammar_notes: [
          "✅ Từ 'now' báo hiệu thì Hiện tại tiếp diễn.",
          "✅ Động từ 'read' chuyển thành 'reading'. Chủ ngữ số ít 'my sister' đi với 'is'."
        ],
        vocab_notes: [
          { word: "read a book", vi: "đọc sách", ipa: "riːd ə bʊk" }
        ],
        common_mistakes: [
          "❌ Sai: 'My sister read' → sai thì.",
          "❌ Sai: 'at her room' → dùng 'in her room'."
        ]
      },
      {
        display_cues: "there / be / a / big yard / in front of / my house /.//",
        cues_segments: [
          { text: "there / be / a / big " },
          { text: "yard", tooltip: { vi: "sân", ipa: "jɑːd" } },
          { text: " / in front of / my house /.//" }
        ],
        correct_sentence: "There is a big yard in front of my house.",
        accepted_answers: [
          "There is a big yard in front of my house."
        ],
        structure_vi: "There is + a/an + N (số ít) + giới từ chỉ vị trí + nơi chốn",
        grammar_notes: [
          "✅ 'a big yard' là danh từ số ít nên dùng 'There is'.",
          "✅ 'in front of' nghĩa là phía trước."
        ],
        vocab_notes: [
          { word: "in front of", vi: "ở phía trước", ipa: "ɪn frʌnt ɒv" }
        ],
        common_mistakes: [
          "❌ Sai: 'There are a big yard' → danh từ số ít phải dùng 'is'."
        ]
      },
      {
        display_cues: "she / have / maths / Mondays / Wednesdays /.//",
        cues_segments: [
          { text: "she / have / maths / Mondays / Wednesdays /.//" }
        ],
        correct_sentence: "She has maths on Mondays and Wednesdays.",
        accepted_answers: [
          "She has maths on Mondays and Wednesdays.",
          "She has maths on Mondays and on Wednesdays."
        ],
        structure_vi: "S + have/has + môn học + on + ngày",
        grammar_notes: [
          "✅ Chủ ngữ 'She' thì động từ 'have' phải đổi thành 'has'.",
          "✅ Dùng giới từ 'on' trước ngày trong tuần."
        ],
        vocab_notes: [
          { word: "maths", vi: "môn Toán", ipa: "mæθs" }
        ],
        common_mistakes: [
          "❌ Sai: 'She have' → She đi với has.",
          "❌ Sai: 'in Mondays' → ngày dùng 'on'."
        ]
      }
    ]
  },
  {
    id: "WRITING-MED-GRADE3-P2",
    title: "Writing — Trung bình — Lớp 3-4 — Bài 2",
    grade_min: 3,
    grade_max: 4,
    grade_target: "3-4",
    sec1: [
      {
        display_cues: "time / you / get up / do / what /?//",
        cues_segments: [
          { text: "time / you / get up / do / what /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["what", "time", "do", "you", "get up"],
        correct_sentence: "What time do you get up?",
        structure_vi: "What time + do/does + S + V?",
        grammar_notes: [
          "✅ Cấu trúc hỏi giờ giấc: 'What time'.",
          "✅ Dùng trợ động từ 'do' với chủ ngữ 'you'."
        ],
        vocab_notes: [
          { word: "get up", vi: "thức dậy", ipa: "ɡet ʌp" }
        ],
        common_mistakes: [
          "❌ Sai: 'What you time get up' → sai thứ tự từ."
        ]
      },
      {
        display_cues: "a / let's / to / the / bakery / go /.//",
        cues_segments: [
          { text: "a / let's / to / the / " },
          { text: "bakery", tooltip: { vi: "tiệm bánh", ipa: "ˈbeɪkəri" } },
          { text: " / go /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["let's", "go", "to", "the", "bakery"],
        correct_sentence: "Let's go to the bakery.",
        structure_vi: "Let's + V nguyên mẫu + (to nơi chốn).",
        grammar_notes: [
          "✅ Lời rủ rê: 'Let's' (Chúng ta hãy).",
          "✅ Động từ 'go' dùng ở dạng nguyên thể, đi kèm giới từ 'to' chỉ hướng."
        ],
        vocab_notes: [
          { word: "bakery", vi: "tiệm bánh", ipa: "ˈbeɪkəri" }
        ],
        common_mistakes: [
          "❌ Sai: 'Let's going' → sau let's luôn là V nguyên thể."
        ]
      },
      {
        display_cues: "playing / his / Peter / is / guitar / room / in / the /.//",
        cues_segments: [
          { text: "playing / his / Peter / is / " },
          { text: "guitar", tooltip: { vi: "đàn ghi-ta", ipa: "ɡɪˈtɑːr" } },
          { text: " / room / in / the /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5} {6} {7}.",
        word_bank: ["Peter", "is", "playing", "the", "guitar", "in", "his", "room"],
        correct_sentence: "Peter is playing the guitar in his room.",
        structure_vi: "S + be + playing + nhạc cụ + nơi chốn",
        grammar_notes: [
          "✅ Hiện tại tiếp diễn mô tả việc đang xảy ra.",
          "✅ Cụm từ 'play the guitar' luôn có mạo từ 'the'."
        ],
        vocab_notes: [
          { word: "play the guitar", vi: "chơi ghi-ta", ipa: "pleɪ ðə ɡɪˈtɑːr" }
        ],
        common_mistakes: [
          "❌ Sai: 'playing guitar' → với nhạc cụ phải có mạo từ 'the'."
        ]
      },
      {
        display_cues: "a / lot of / my / monkeys / saw / sister / the / zoo / at /.//",
        cues_segments: [
          { text: "a / lot of / my / monkeys / " },
          { text: "saw", tooltip: { vi: "đã nhìn thấy", ipa: "sɔː" } },
          { text: " / sister / the / zoo / at /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5} {6} {7} {8}.",
        word_bank: ["my", "sister", "saw", "a", "lot of", "monkeys", "at", "the", "zoo"],
        correct_sentence: "My sister saw a lot of monkeys at the zoo.",
        structure_vi: "S + V (quá khứ) + a lot of + N + nơi chốn",
        grammar_notes: [
          "✅ 'saw' là thì quá khứ của 'see'.",
          "✅ Cụm từ 'a lot of' đi với danh từ số nhiều 'monkeys'."
        ],
        vocab_notes: [
          { word: "a lot of", vi: "rất nhiều", ipa: "ə lɒt ɒv" }
        ],
        common_mistakes: [
          "❌ Sai: 'saw a lot monkeys' → thiếu 'of'."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "she / want / to be / a nurse / in the future /.//",
        cues_segments: [
          { text: "she / want / to be / a " },
          { text: "nurse", tooltip: { vi: "y tá", ipa: "nɜːs" } },
          { text: " / in the future /.//" }
        ],
        correct_sentence: "She wants to be a nurse in the future.",
        accepted_answers: [
          "She wants to be a nurse in the future."
        ],
        structure_vi: "S + want(s) to be + a/an + nghề nghiệp",
        grammar_notes: [
          "✅ 'She' là số ít nên 'want' phải thêm 's' thành 'wants'.",
          "✅ Dùng 'a' trước nghề nghiệp bắt đầu bằng phụ âm (a nurse)."
        ],
        vocab_notes: [
          { word: "nurse", vi: "y tá", ipa: "nɜːs" }
        ],
        common_mistakes: [
          "❌ Sai: 'She want' → thiếu 's'."
        ]
      },
      {
        display_cues: "why / do / you / like / bears /?//",
        cues_segments: [
          { text: "why / do / you / like / " },
          { text: "bears", tooltip: { vi: "những con gấu", ipa: "beəz" } },
          { text: " /?//" }
        ],
        correct_sentence: "Why do you like bears?",
        accepted_answers: [
          "Why do you like bears?"
        ],
        structure_vi: "Why + do/does + S + like + danh từ?",
        grammar_notes: [
          "✅ Hỏi lí do bằng 'Why'.",
          "✅ Danh từ chung khi nói về sở thích để ở dạng số nhiều (bears)."
        ],
        vocab_notes: [
          { word: "bears", vi: "loài gấu", ipa: "beəz" }
        ],
        common_mistakes: [
          "❌ Sai: 'Why you like bears' → thiếu trợ động từ 'do'."
        ]
      },
      {
        display_cues: "we / not / go / school / yesterday /.//",
        cues_segments: [
          { text: "we / not / go / school / " },
          { text: "yesterday", tooltip: { vi: "hôm qua", ipa: "ˈjestədeɪ" } },
          { text: " /.//" }
        ],
        correct_sentence: "We did not go to school yesterday.",
        accepted_answers: [
          "We did not go to school yesterday.",
          "We didn't go to school yesterday."
        ],
        structure_vi: "S + didn't / did not + V + to + nơi chốn + thời gian",
        grammar_notes: [
          "✅ 'yesterday' là quá khứ, dạng phủ định dùng trợ động từ 'did not' (hoặc didn't).",
          "✅ Phải dùng giới từ 'to' sau 'go' (go to school)."
        ],
        vocab_notes: [
          { word: "go to school", vi: "đi học", ipa: "ɡəʊ tʊ skuːl" }
        ],
        common_mistakes: [
          "❌ Sai: 'We do not go' → sai thì."
        ]
      }
    ]
  },
  {
    id: "WRITING-MED-GRADE3-P3",
    title: "Writing — Trung bình — Lớp 3-4 — Bài 3",
    grade_min: 3,
    grade_max: 4,
    grade_target: "3-4",
    sec1: [
      {
        display_cues: "doing / what / your / is / brother /?//",
        cues_segments: [
          { text: "doing / what / your / is / brother /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["what", "is", "your", "brother", "doing"],
        correct_sentence: "What is your brother doing?",
        structure_vi: "What + is/are + S + doing?",
        grammar_notes: [
          "✅ Câu hỏi thì Hiện tại tiếp diễn.",
          "✅ 'your brother' là số ít, dùng 'is'."
        ],
        vocab_notes: [
          { word: "doing", vi: "đang làm", ipa: "ˈduːɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'What your brother is doing?' → đảo 'is' lên trước chủ ngữ."
        ]
      },
      {
        display_cues: "time / do / what / you / go to bed /?//",
        cues_segments: [
          { text: "time / do / what / you / go to bed /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["what", "time", "do", "you", "go to bed"],
        correct_sentence: "What time do you go to bed?",
        structure_vi: "What time + do + S + V?",
        grammar_notes: [
          "✅ Cấu trúc hỏi giờ: 'What time'.",
          "✅ Trợ động từ 'do' đứng trước chủ ngữ 'you'."
        ],
        vocab_notes: [
          { word: "go to bed", vi: "đi ngủ", ipa: "ɡəʊ tʊ bed" }
        ],
        common_mistakes: [
          "❌ Sai: 'What do you time go to bed' → từ để hỏi là một cụm 'What time'."
        ]
      },
      {
        display_cues: "she / works / in / a / hospital /.//",
        cues_segments: [
          { text: "she / works / in / a / " },
          { text: "hospital", tooltip: { vi: "bệnh viện", ipa: "ˈhɒspɪtl" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["she", "works", "in", "a", "hospital"],
        correct_sentence: "She works in a hospital.",
        structure_vi: "S + V(s/es) + in/at + nơi chốn",
        grammar_notes: [
          "✅ Nói về công việc thường xuyên, dùng Hiện tại đơn.",
          "✅ Động từ 'works' thêm 's' vì chủ ngữ là 'She'."
        ],
        vocab_notes: [
          { word: "hospital", vi: "bệnh viện", ipa: "ˈhɒspɪtl" }
        ],
        common_mistakes: [
          "❌ Sai: 'She work' → thiếu s."
        ]
      },
      {
        display_cues: "favourite / is / beef / my / food /.//",
        cues_segments: [
          { text: "favourite / is / " },
          { text: "beef", tooltip: { vi: "thịt bò", ipa: "biːf" } },
          { text: " / my / food /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["my", "favourite", "food", "is", "beef"],
        correct_sentence: "My favourite food is beef.",
        structure_vi: "My favourite food + is + tên món ăn",
        grammar_notes: [
          "✅ Cụm từ chỉ đồ ăn yêu thích: 'My favourite food'.",
          "✅ Động từ to be ở số ít là 'is'."
        ],
        vocab_notes: [
          { word: "favourite", vi: "yêu thích", ipa: "ˈfeɪvərɪt" },
          { word: "beef", vi: "thịt bò", ipa: "biːf" }
        ],
        common_mistakes: [
          "❌ Sai: 'My food favourite' → tính từ favourite phải đứng trước danh từ."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "would / you / like / some / orange juice /?//",
        cues_segments: [
          { text: "would / you / like / some / orange " },
          { text: "juice", tooltip: { vi: "nước ép", ipa: "dʒuːs" } },
          { text: " /?//" }
        ],
        correct_sentence: "Would you like some orange juice?",
        accepted_answers: [
          "Would you like some orange juice?"
        ],
        structure_vi: "Would you like + some + đồ uống?",
        grammar_notes: [
          "✅ Mời ai đó dùng gì: 'Would you like...?'",
          "✅ Với đồ ăn không đếm được dùng 'some'."
        ],
        vocab_notes: [
          { word: "orange juice", vi: "nước cam", ipa: "ˈɒrɪndʒ dʒuːs" }
        ],
        common_mistakes: [
          "❌ Sai: 'Do you like some orange juice' → mời phải dùng 'Would'."
        ]
      },
      {
        display_cues: "I / have / English / twice / a week /.//",
        cues_segments: [
          { text: "I / have / English / " },
          { text: "twice", tooltip: { vi: "hai lần", ipa: "twaɪs" } },
          { text: " / a week /.//" }
        ],
        correct_sentence: "I have English twice a week.",
        accepted_answers: [
          "I have English twice a week."
        ],
        structure_vi: "S + have/has + môn học + mức độ tần suất",
        grammar_notes: [
          "✅ 'twice a week' (hai lần một tuần) để chỉ sự thường xuyên.",
          "✅ Chủ ngữ 'I' đi với động từ nguyên mẫu 'have'."
        ],
        vocab_notes: [
          { word: "twice a week", vi: "2 lần mỗi tuần", ipa: "twaɪs ə wiːk" }
        ],
        common_mistakes: [
          "❌ Sai: 'two times a week' → dù không hoàn toàn sai ngữ pháp nhưng 'twice' chuẩn hơn trong chương trình học."
        ]
      },
      {
        display_cues: "the / supermarket / be / behind / the post office /.//",
        cues_segments: [
          { text: "the / " },
          { text: "supermarket", tooltip: { vi: "siêu thị", ipa: "ˈsuːpəmɑːkɪt" } },
          { text: " / be / behind / the post office /.//" }
        ],
        correct_sentence: "The supermarket is behind the post office.",
        accepted_answers: [
          "The supermarket is behind the post office."
        ],
        structure_vi: "S (nơi chốn) + is + giới từ + nơi chốn",
        grammar_notes: [
          "✅ Chỉ vị trí: 'behind' (phía sau).",
          "✅ 'the supermarket' số ít nên dùng 'is'."
        ],
        vocab_notes: [
          { word: "behind", vi: "ở đằng sau", ipa: "bɪˈhaɪnd" },
          { word: "post office", vi: "bưu điện", ipa: "pəʊst ˈɒfɪs" }
        ],
        common_mistakes: [
          "❌ Sai: 'The supermarket be' → phải chia to be thành 'is'."
        ]
      }
    ]
  },
  {
    id: "WRITING-MED-GRADE5-P1",
    title: "Writing — Trung bình — Lớp 5-6 — Bài 1",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "going to / write / a letter / to my friend / I am /.//",
        cues_segments: [
          { text: "going to / write / a letter / to my friend / I am /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["I am", "going to", "write", "a letter", "to", "my friend"],
        correct_sentence: "I am going to write a letter to my friend.",
        structure_vi: "S + be going to + V + a letter to + ai đó",
        grammar_notes: [
          "✅ Dự định tương lai: 'be going to'.",
          "✅ Cụm từ: 'write a letter to someone' (viết thư cho ai)."
        ],
        vocab_notes: [
          { word: "write a letter", vi: "viết một bức thư", ipa: "raɪt ə ˈletər" }
        ],
        common_mistakes: [
          "❌ Sai: 'write a letter for my friend' → viết cho ai thì dùng giới từ 'to'."
        ]
      },
      {
        display_cues: "the trip / was / more / than / exciting / I thought /.//",
        cues_segments: [
          { text: "the trip / was / more / than / " },
          { text: "exciting", tooltip: { vi: "thú vị", ipa: "ɪkˈsaɪtɪŋ" } },
          { text: " / I thought /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5} {6}.",
        word_bank: ["the trip", "was", "more", "exciting", "than", "I", "thought"],
        correct_sentence: "The trip was more exciting than I thought.",
        structure_vi: "S + be + more + tính từ dài + than + S + thought",
        grammar_notes: [
          "✅ So sánh hơn với tính từ dài 'exciting': dùng 'more exciting than'.",
          "✅ 'I thought' (tôi đã nghĩ) ở quá khứ tương thích với động từ 'was'."
        ],
        vocab_notes: [
          { word: "thought", vi: "đã nghĩ (quá khứ của think)", ipa: "θɔːt" }
        ],
        common_mistakes: [
          "❌ Sai: 'excitinger' → tính từ dài phải dùng more."
        ]
      },
      {
        display_cues: "you / shouldn't / play / matches / with / because it is dangerous /.//",
        cues_segments: [
          { text: "you / shouldn't / play / " },
          { text: "matches", tooltip: { vi: "diêm (số nhiều)", ipa: "mætʃɪz" } },
          { text: " / with / because it is " },
          { text: "dangerous", tooltip: { vi: "nguy hiểm", ipa: "ˈdeɪndʒərəs" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["you", "shouldn't", "play with", "matches", "because", "it is dangerous"],
        // Fix: word_bank format, break "play with" to "play", "with" if display_cues are separate. 
        // display_cues: "you / shouldn't / play / matches / with / because it is dangerous"
        // Let's redefine word_bank to match exactly the cues.
        correct: ["you", "shouldn't", "play", "with", "matches", "because it is dangerous"],
        correct_sentence: "You shouldn't play with matches because it is dangerous.",
        structure_vi: "S + shouldn't + V + O + because + S + be + adj",
        grammar_notes: [
          "✅ Đưa ra lời khuyên không nên làm gì: 'shouldn't' + V.",
          "✅ 'play with matches': chơi với diêm."
        ],
        vocab_notes: [
          { word: "matches", vi: "que diêm", ipa: "mætʃɪz" }
        ],
        common_mistakes: [
          "❌ Sai: 'play matches' → thiếu giới từ 'with'."
        ]
      },
      {
        display_cues: "the characters / the story / in / are / foxes / two /.//",
        cues_segments: [
          { text: "the " },
          { text: "characters", tooltip: { vi: "nhân vật", ipa: "ˈkærəktərz" } },
          { text: " / the story / in / are / foxes / two /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["the characters", "in", "the story", "are", "two", "foxes"],
        correct: ["the characters", "in", "the story", "are", "two", "foxes"],
        correct_sentence: "The characters in the story are two foxes.",
        structure_vi: "S (the characters in the story) + be + bổ ngữ",
        grammar_notes: [
          "✅ Danh từ số nhiều 'characters' đi với động từ to be 'are'.",
          "✅ 'two foxes': hai con cáo."
        ],
        vocab_notes: [
          { word: "character", vi: "nhân vật", ipa: "ˈkærəktər" },
          { word: "fox", vi: "con cáo", ipa: "fɒks" }
        ],
        common_mistakes: [
          "❌ Sai: 'foxs' → đuôi -x thêm số nhiều phải là -es."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "what / you / do / tomorrow / morning /?//",
        cues_segments: [
          { text: "what / you / do / tomorrow / morning /?//" }
        ],
        correct_sentence: "What will you do tomorrow morning?",
        accepted_answers: [
          "What will you do tomorrow morning?",
          "What are you going to do tomorrow morning?"
        ],
        structure_vi: "What + will + S + do + thời gian ở tương lai?",
        grammar_notes: [
          "✅ 'tomorrow morning' (sáng mai) → thì Tương lai đơn (hoặc Tương lai gần).",
          "✅ Mượn trợ động từ 'will' đảo lên trước chủ ngữ."
        ],
        vocab_notes: [
          { word: "tomorrow", vi: "ngày mai", ipa: "təˈmɒrəʊ" }
        ],
        common_mistakes: [
          "❌ Sai: 'What do you do' → thiếu từ chỉ tương lai."
        ]
      },
      {
        display_cues: "I / think / the / older brother / be / greedy /.//",
        cues_segments: [
          { text: "I / think / the / older brother / be / " },
          { text: "greedy", tooltip: { vi: "tham lam", ipa: "ˈɡriːdi" } },
          { text: " /.//" }
        ],
        correct_sentence: "I think the older brother is greedy.",
        accepted_answers: [
          "I think the older brother is greedy."
        ],
        structure_vi: "I think + S + be + adj",
        grammar_notes: [
          "✅ 'older brother' là ngôi thứ 3 số ít → động từ to be chia là 'is'.",
          "✅ Cấu trúc nêu cảm nghĩ: 'I think' + một mệnh đề."
        ],
        vocab_notes: [
          { word: "greedy", vi: "tham lam", ipa: "ˈɡriːdi" }
        ],
        common_mistakes: [
          "❌ Sai: 'I think older brother be greedy' → thiếu mạo từ 'the' và không chia 'be'."
        ]
      },
      {
        display_cues: "she / have / a / pain / in / her / stomach /.//",
        cues_segments: [
          { text: "she / have / a / " },
          { text: "pain", tooltip: { vi: "cơn đau", ipa: "peɪn" } },
          { text: " / in / her / " },
          { text: "stomach", tooltip: { vi: "dạ dày", ipa: "ˈstʌmək" } },
          { text: " /.//" }
        ],
        correct_sentence: "She has a pain in her stomach.",
        accepted_answers: [
          "She has a pain in her stomach."
        ],
        structure_vi: "S + have/has + a pain + in + bộ phận cơ thể",
        grammar_notes: [
          "✅ 'She' đi với động từ số ít 'has'.",
          "✅ Mô tả cơn đau ở bộ phận nào đó: a pain IN + bộ phận."
        ],
        vocab_notes: [
          { word: "stomach", vi: "dạ dày, bụng", ipa: "ˈstʌmək" }
        ],
        common_mistakes: [
          "❌ Sai: 'She have a pain' → sai chia động từ."
        ]
      }
    ]
  },
  {
    id: "WRITING-MED-GRADE5-P2",
    title: "Writing — Trung bình — Lớp 5-6 — Bài 2",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "will / in the mountains / be / they / tomorrow /.//",
        cues_segments: [
          { text: "will / in the mountains / be / they / tomorrow /.//" }
        ],
        template: "{0} {1} {2} {3} {4}.",
        word_bank: ["they", "will", "be", "in the mountains", "tomorrow"],
        correct: ["they", "will", "be", "in the mountains", "tomorrow"],
        correct_sentence: "They will be in the mountains tomorrow.",
        structure_vi: "S + will be + nơi chốn + thời gian",
        grammar_notes: [
          "✅ 'tomorrow' là tương lai nên dùng 'will be'.",
          "✅ Nơi chốn đứng trước thời gian."
        ],
        vocab_notes: [
          { word: "in the mountains", vi: "ở trên vùng núi", ipa: "ɪn ðə ˈmaʊntɪnz" }
        ],
        common_mistakes: [
          "❌ Sai: 'They will in the mountains' → thiếu động từ 'be'."
        ]
      },
      {
        display_cues: "because / couldn't / the tree / run down / it was too heavy / the fox /.//",
        cues_segments: [
          { text: "because / couldn't / the tree / " },
          { text: "run down", tooltip: { vi: "chạy xuống", ipa: "rʌn daʊn" } },
          { text: " / it was too " },
          { text: "heavy", tooltip: { vi: "nặng nề", ipa: "ˈhevi" } },
          { text: " / the fox /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["the fox", "couldn't", "run down", "the tree", "because", "it was too heavy"],
        correct: ["the fox", "couldn't", "run down", "the tree", "because", "it was too heavy"],
        correct_sentence: "The fox couldn't run down the tree because it was too heavy.",
        structure_vi: "S + couldn't + V + O + because + S + be + adj",
        grammar_notes: [
          "✅ Mệnh đề nguyên nhân bắt đầu bằng 'because'.",
          "✅ 'couldn't' là dạng phủ định của 'could' ở quá khứ."
        ],
        vocab_notes: [
          { word: "heavy", vi: "nặng", ipa: "ˈhevi" }
        ],
        common_mistakes: [
          "❌ Sai: 'run down the tree the fox' → sai trật tự chủ-vị."
        ]
      },
      {
        display_cues: "you / go out / shouldn't / because / it's raining / hard /.//",
        cues_segments: [
          { text: "you / go out / shouldn't / because / it's raining / hard /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["you", "shouldn't", "go out", "because", "it's raining", "hard"],
        correct: ["you", "shouldn't", "go out", "because", "it's raining", "hard"],
        correct_sentence: "You shouldn't go out because it's raining hard.",
        structure_vi: "S + shouldn't + V + because + S + be V-ing + adv",
        grammar_notes: [
          "✅ Lời khuyên không nên làm gì: 'shouldn't + V'.",
          "✅ 'raining hard' (mưa lớn) dùng trạng từ 'hard' bổ nghĩa cho động từ 'rain'."
        ],
        vocab_notes: [
          { word: "go out", vi: "đi ra ngoài", ipa: "ɡəʊ aʊt" }
        ],
        common_mistakes: [
          "❌ Sai: 'raining hardly' → 'hardly' nghĩa là 'hầu như không', trạng từ của 'hard' vẫn là 'hard'."
        ]
      },
      {
        display_cues: "often / in your free time / do / what / you / do /?//",
        cues_segments: [
          { text: "often / in your free time / do / what / you / do /?//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}?",
        word_bank: ["what", "do", "you", "often", "do", "in your free time"],
        correct: ["what", "do", "you", "often", "do", "in your free time"],
        correct_sentence: "What do you often do in your free time?",
        structure_vi: "What + do + S + often + do + in your free time?",
        grammar_notes: [
          "✅ Cấu trúc hỏi thói quen, sở thích trong thời gian rảnh.",
          "✅ 'often' đứng trước động từ chính 'do'."
        ],
        vocab_notes: [
          { word: "free time", vi: "thời gian rảnh", ipa: "friː taɪm" }
        ],
        common_mistakes: [
          "❌ Sai: 'What do you do often' → trạng từ tần suất thường đứng trước động từ thường."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "he / have / toothache / so / he / should / go / the dentist /.//",
        cues_segments: [
          { text: "he / have / " },
          { text: "toothache", tooltip: { vi: "đau răng", ipa: "ˈtuːθeɪk" } },
          { text: " / so / he / should / go / the " },
          { text: "dentist", tooltip: { vi: "nha sĩ", ipa: "ˈdentɪst" } },
          { text: " /.//" }
        ],
        correct_sentence: "He has a toothache so he should go to the dentist.",
        accepted_answers: [
          "He has a toothache so he should go to the dentist.",
          "He has toothache so he should go to the dentist."
        ],
        structure_vi: "S + has (a) bệnh + so + S + should go to the dentist",
        grammar_notes: [
          "✅ Động từ 'have' đi với 'He' chuyển thành 'has'.",
          "✅ Dùng mạo từ 'a' trước các bệnh đếm được (a toothache), nhưng tiếng Anh Anh có thể bỏ 'a'.",
          "✅ Giới từ 'to' chỉ hướng đi (go to the dentist)."
        ],
        vocab_notes: [
          { word: "dentist", vi: "nha sĩ", ipa: "ˈdentɪst" }
        ],
        common_mistakes: [
          "❌ Sai: 'He have' → chia sai động từ."
        ]
      },
      {
        display_cues: "how many / lesson / you / have / today /?//",
        cues_segments: [
          { text: "how many / " },
          { text: "lesson", tooltip: { vi: "tiết học", ipa: "ˈlesn" } },
          { text: " / you / have / today /?//" }
        ],
        correct_sentence: "How many lessons do you have today?",
        accepted_answers: [
          "How many lessons do you have today?"
        ],
        structure_vi: "How many + danh từ đếm được số nhiều + do + S + have?",
        grammar_notes: [
          "✅ Sau 'How many' phải là danh từ số nhiều: 'lessons'.",
          "✅ Mượn trợ động từ 'do' trước 'you'."
        ],
        vocab_notes: [
          { word: "lessons", vi: "tiết học", ipa: "ˈlesnz" }
        ],
        common_mistakes: [
          "❌ Sai: 'How many lesson' → quên thêm 's' vào từ lesson."
        ]
      },
      {
        display_cues: "I / reading / the / story / of / Mai An Tiem /.//",
        cues_segments: [
          { text: "I / reading / the / story / of / Mai An Tiem /.//" }
        ],
        correct_sentence: "I am reading the story of Mai An Tiem.",
        accepted_answers: [
          "I am reading the story of Mai An Tiem.",
          "I'm reading the story of Mai An Tiem."
        ],
        structure_vi: "S + am/is/are + V-ing + O",
        grammar_notes: [
          "✅ Có V-ing ('reading') nên phải thêm động từ to be 'am' đi với 'I'.",
          "✅ Câu diễn tả hành động đang diễn ra ở hiện tại."
        ],
        vocab_notes: [
          { word: "story", vi: "câu chuyện", ipa: "ˈstɔːri" }
        ],
        common_mistakes: [
          "❌ Sai: 'I reading' → thiếu to be 'am'."
        ]
      }
    ]
  },
  {
    id: "WRITING-MED-GRADE5-P3",
    title: "Writing — Trung bình — Lớp 5-6 — Bài 3",
    grade_min: 5,
    grade_max: 6,
    grade_target: "5-6",
    sec1: [
      {
        display_cues: "what / you / when / read / happens / the story /?//",
        cues_segments: [
          { text: "what / you / when / read / happens / the story /?//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}?",
        word_bank: ["what", "happens", "when", "you", "read", "the story"],
        correct: ["what", "happens", "when", "you", "read", "the story"],
        correct_sentence: "What happens when you read the story?",
        structure_vi: "What + happens + when + S + V?",
        grammar_notes: [
          "✅ 'What' là chủ ngữ của từ 'happens' nên động từ thêm 's'.",
          "✅ 'when' nối hai mệnh đề."
        ],
        vocab_notes: [
          { word: "happens", vi: "xảy ra", ipa: "ˈhæpənz" }
        ],
        common_mistakes: [
          "❌ Sai: 'What do happen' → 'What' đóng vai trò chủ ngữ nên không mượn trợ động từ do/does."
        ]
      },
      {
        display_cues: "more / life / in the city / is / in the country / than / exciting /.//",
        cues_segments: [
          { text: "more / life / in the city / is / in the country / than / " },
          { text: "exciting", tooltip: { vi: "thú vị", ipa: "ɪkˈsaɪtɪŋ" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5} {6}.",
        word_bank: ["life", "in the city", "is", "more", "exciting", "than", "in the country"],
        correct: ["life", "in the city", "is", "more", "exciting", "than", "in the country"],
        correct_sentence: "Life in the city is more exciting than in the country.",
        structure_vi: "N1 + is + more + adj + than + N2",
        grammar_notes: [
          "✅ So sánh hơn của tính từ dài 'exciting' dùng 'more + adj + than'."
        ],
        vocab_notes: [
          { word: "exciting", vi: "thú vị, náo nhiệt", ipa: "ɪkˈsaɪtɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'Life in the city is exciting more' → 'more' đứng trước tính từ."
        ]
      },
      {
        display_cues: "take / you / a boat trip / will / around the islands /?//",
        cues_segments: [
          { text: "take / you / a boat trip / will / around the " },
          { text: "islands", tooltip: { vi: "những hòn đảo", ipa: "ˈaɪləndz" } },
          { text: " /?//" }
        ],
        template: "{0} {1} {2} {3} {4}?",
        word_bank: ["will", "you", "take", "a boat trip", "around the islands"],
        correct: ["will", "you", "take", "a boat trip", "around the islands"],
        correct_sentence: "Will you take a boat trip around the islands?",
        structure_vi: "Will + S + V + O?",
        grammar_notes: [
          "✅ Câu hỏi Yes/No ở tương lai, đảo 'will' lên trước chủ ngữ.",
          "✅ 'take a boat trip': đi dạo bằng thuyền."
        ],
        vocab_notes: [
          { word: "islands", vi: "những hòn đảo", ipa: "ˈaɪləndz" },
          { word: "boat trip", vi: "chuyến đi thuyền", ipa: "bəʊt trɪp" }
        ],
        common_mistakes: [
          "❌ Sai: 'You will take' → đây là câu hỏi, phải đảo will lên."
        ]
      },
      {
        display_cues: "practise / listening / by / I / watching / English cartoons /.//",
        cues_segments: [
          { text: "practise / listening / by / I / watching / English " },
          { text: "cartoons", tooltip: { vi: "phim hoạt hình", ipa: "kɑːˈtuːnz" } },
          { text: " /.//" }
        ],
        template: "{0} {1} {2} {3} {4} {5}.",
        word_bank: ["I", "practise", "listening", "by", "watching", "English cartoons"],
        correct: ["I", "practise", "listening", "by", "watching", "English cartoons"],
        correct_sentence: "I practise listening by watching English cartoons.",
        structure_vi: "S + practise(s) + V-ing + by + V-ing",
        grammar_notes: [
          "✅ Sau 'practise' (luyện tập) là V-ing ('listening').",
          "✅ Giới từ 'by' (bằng cách) cũng cộng với V-ing ('watching')."
        ],
        vocab_notes: [
          { word: "practise", vi: "luyện tập", ipa: "ˈpræktɪs" },
          { word: "cartoons", vi: "phim hoạt hình", ipa: "kɑːˈtuːnz" }
        ],
        common_mistakes: [
          "❌ Sai: 'practise to listen' → sau practise phải là V-ing."
        ]
      }
    ],
    sec2: [
      {
        display_cues: "we / build / sandcastles / the beach / next week /.//",
        cues_segments: [
          { text: "we / build / " },
          { text: "sandcastles", tooltip: { vi: "lâu đài cát", ipa: "ˈsændˌkɑːslz" } },
          { text: " / the beach / next week /.//" }
        ],
        correct_sentence: "We will build sandcastles on the beach next week.",
        accepted_answers: [
          "We will build sandcastles on the beach next week.",
          "We are going to build sandcastles on the beach next week."
        ],
        structure_vi: "S + will/be going to + V + on the beach + thời gian tương lai",
        grammar_notes: [
          "✅ Dấu hiệu tương lai 'next week' → dùng 'will' hoặc 'be going to'.",
          "✅ Trên bãi biển: giới từ 'on' (on the beach)."
        ],
        vocab_notes: [
          { word: "sandcastle", vi: "lâu đài cát", ipa: "ˈsændˌkɑːsl" }
        ],
        common_mistakes: [
          "❌ Sai: 'We build' → thiếu từ chỉ tương lai.",
          "❌ Sai: 'in the beach' → dùng 'on' mới đúng."
        ]
      },
      {
        display_cues: "what / you / usually / do / spring /?//",
        cues_segments: [
          { text: "what / you / usually / do / " },
          { text: "spring", tooltip: { vi: "mùa xuân", ipa: "sprɪŋ" } },
          { text: " /?//" }
        ],
        correct_sentence: "What do you usually do in spring?",
        accepted_answers: [
          "What do you usually do in spring?",
          "What do you usually do in the spring?"
        ],
        structure_vi: "What + do/does + S + usually + do + in + mùa?",
        grammar_notes: [
          "✅ Câu hỏi về thói quen: mượn trợ động từ 'do'.",
          "✅ Các mùa trong năm đi với giới từ 'in' (in spring)."
        ],
        vocab_notes: [
          { word: "spring", vi: "mùa xuân", ipa: "sprɪŋ" }
        ],
        common_mistakes: [
          "❌ Sai: 'What you usually do' → thiếu trợ động từ 'do'."
        ]
      },
      {
        display_cues: "he / be / short / and / fat /.//",
        cues_segments: [
          { text: "he / be / short / and / " },
          { text: "fat", tooltip: { vi: "béo", ipa: "fæt" } },
          { text: " /.//" }
        ],
        correct_sentence: "He is short and fat.",
        accepted_answers: [
          "He is short and fat."
        ],
        structure_vi: "S + is/am/are + adj + and + adj",
        grammar_notes: [
          "✅ Tả ngoại hình dùng động từ to be.",
          "✅ 'He' đi với 'is'."
        ],
        vocab_notes: [
          { word: "short", vi: "thấp, lùn", ipa: "ʃɔːt" },
          { word: "fat", vi: "béo", ipa: "fæt" }
        ],
        common_mistakes: [
          "❌ Sai: 'He be short' → phải chia động từ 'be' thành 'is'."
        ]
      }
    ]
  }
];

function generateFile(data) {
  return {
    id: data.id,
    title: data.title,
    skill: "writing",
    difficulty: "medium",
    grade_min: data.grade_min,
    grade_max: data.grade_max,
    grade_target: data.grade_target,
    sections: [
      {
        id: "sec-1",
        type: "rearrange",
        title: "I. Rearrange the words to make correct sentences.",
        points: 8,
        points_per_question: 2,
        instruction: "Sắp xếp các từ/cụm từ bị xáo trộn để tạo thành câu hoàn chỉnh và có nghĩa.",
        example: {
          display_cues: "my uncle / a small village / lives / in / near the river /.//",
          answer: "My uncle lives in a small village near the river."
        },
        questions: data.sec1.map((q, idx) => ({
          id: "q" + (idx + 1),
          type: "drag-drop-fill",
          display_cues: q.display_cues,
          cues_segments: q.cues_segments,
          template: q.template,
          word_bank: q.word_bank,
          correct: q.correct || q.word_bank.slice().sort((a,b) => {
             const lowerCorrect = q.correct_sentence.toLowerCase();
             return lowerCorrect.indexOf(a.toLowerCase()) - lowerCorrect.indexOf(b.toLowerCase());
          }),
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
          correct_sentence: q.correct_sentence,
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
}

DATA.forEach(d => {
  const json = generateFile(d);
  
  const destPath = path.join(__dirname, '..', 'content', 'lop6', 'tieng-anh', 'writing', d.id + '.json');
  fs.writeFileSync(destPath, JSON.stringify(json, null, 2));
  console.log('Created:', destPath);
});
