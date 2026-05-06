import json
import os

def make_q1(q_id, display_cues, cues_segments, word_bank, correct, correct_sentence, vi_structure, grammar, vocab):
    punctuation = correct_sentence[-1] if correct_sentence[-1] in ".?" else "."
    return {
        "id": q_id,
        "type": "drag-drop-fill",
        "display_cues": display_cues,
        "cues_segments": cues_segments,
        "template": " ".join([f"{{{i}}}" for i in range(len(word_bank))]) + punctuation,
        "word_bank": word_bank,
        "correct": correct,
        "explanation": {
            "correct_sentence": correct_sentence,
            "structure_vi": vi_structure,
            "grammar_notes": grammar,
            "vocab_notes": vocab,
            "common_mistakes": []
        }
    }

def make_q2(q_id, display_cues, cues_segments, accepted, correct_sentence, vi_structure, grammar, vocab):
    return {
        "id": q_id,
        "type": "write-sentence",
        "display_cues": display_cues,
        "cues_segments": cues_segments,
        "accepted_answers": accepted,
        "explanation": {
            "correct_sentence": correct_sentence,
            "structure_vi": vi_structure,
            "grammar_notes": grammar,
            "vocab_notes": vocab,
            "common_mistakes": []
        }
    }

def create_writing_json(id_val, grade_level, p_num, sec1_q, sec2_q):
    g_min = 3 if grade_level == 3 else 4
    g_max = 4 if grade_level == 3 else 5
    g_target = "3-4" if grade_level == 3 else "4-5"
        
    title = f"Writing — Khó — Lớp {g_target} — Bài {p_num}"
    
    doc = {
        "id": id_val,
        "title": title,
        "type": "writing",
        "skill": "writing",
        "difficulty": "hard",
        "grade_min": g_min,
        "grade_max": g_max,
        "grade_target": g_target,
        "pathway": "lop6",
        "subject": "tieng-anh",
        "ui_language": "en",
        "is_free": False,
        "total_points": 14,
        "instructions_vi": "Bài thi Writing gồm 2 phần. Phần I: Sắp xếp các cụm từ để tạo thành câu hoàn chỉnh và đúng ngữ pháp. Phần II: Viết câu hoàn chỉnh dựa vào các từ gợi ý, không quá 15 từ mỗi câu.",
        "sections": [
            {
                "id": "sec-1",
                "type": "rearrange",
                "title": "I. Rearrange the groups of words in the correct order to make complete sentences.",
                "points": 8,
                "points_per_question": 2,
                "instruction": "Sắp xếp các cụm từ theo đúng thứ tự để tạo thành câu hoàn chỉnh, đúng ngữ pháp.",
                "questions": sec1_q
            },
            {
                "id": "sec-2",
                "type": "sentence-building",
                "title": "II. Write complete sentences with the given cues. You must write NO MORE THAN fifteen words for each sentence.",
                "points": 6,
                "points_per_question": 2,
                "instruction": "Viết câu hoàn chỉnh và đúng ngữ pháp dựa vào các từ gợi ý. Mỗi câu không được vượt quá 15 từ.",
                "questions": sec2_q
            }
        ]
    }
    
    os.makedirs("content/lop6/tieng-anh/writing", exist_ok=True)
    with open(f"content/lop6/tieng-anh/writing/{id_val}.json", "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)

# --- GRADE 3 P1 ---
g3_p1_s1 = [
    make_q1("q1", "because / he was sick / didn't go / yesterday / he / to school /.//",
            [{"text": "because / he was "}, {"text": "sick", "tooltip": {"vi": "ốm, bệnh", "ipa": "sɪk"}}, {"text": " / didn't go / yesterday / he / to school /.//"}],
            ["he", "didn't go", "to school", "yesterday", "because", "he was sick"],
            ["he", "didn't go", "to school", "yesterday", "because", "he was sick"],
            "He didn't go to school yesterday because he was sick.",
            "S + didn't + V + nơi chốn + thời gian + because + mệnh đề lý do",
            ["✅ Quá khứ đơn dạng phủ định: 'didn't + V'.", "✅ 'because' nối mệnh đề chỉ nguyên nhân."],
            []),
    make_q1("q2", "more expensive / the red one / the blue shirt / is / than /.//",
            [{"text": "more "}, {"text": "expensive", "tooltip": {"vi": "đắt tiền", "ipa": "ɪkˈspensɪv"}}, {"text": " / the red one / the blue shirt / is / than /.//"}],
            ["the blue shirt", "is", "more expensive", "than", "the red one"],
            ["the blue shirt", "is", "more expensive", "than", "the red one"],
            "The blue shirt is more expensive than the red one.",
            "S1 + be + more + tính từ dài + than + S2",
            ["✅ So sánh hơn với tính từ dài: 'more expensive than'.", "✅ 'one' thay thế cho 'shirt' để tránh lặp từ."],
            []),
    make_q1("q3", "last weekend / what / at the park / did you do /?//",
            [{"text": "last weekend / what / at the park / did you do /?//"}],
            ["what", "did you do", "at the park", "last weekend"],
            ["what", "did you do", "at the park", "last weekend"],
            "What did you do at the park last weekend?",
            "What + did + S + do + nơi chốn + thời gian?",
            ["✅ Câu hỏi thì quá khứ đơn với từ để hỏi 'What'.", "✅ Trạng từ thời gian 'last weekend' thường đứng cuối câu."],
            []),
    make_q1("q4", "faster / me / my brother / runs / than /.//",
            [{"text": "faster / me / my brother / runs / than /.//"}],
            ["my brother", "runs", "faster", "than", "me"],
            ["my brother", "runs", "faster", "than", "me"],
            "My brother runs faster than me.",
            "S1 + V + trạng từ ngắn-er + than + tân ngữ",
            ["✅ So sánh hơn của trạng từ 'fast' là 'faster'.", "✅ Ngôi thứ 3 số ít 'brother' nên động từ 'run' thêm 's'."],
            [])
]
g3_p1_s2 = [
    make_q2("q5", "I / would like / glass / orange juice / please /.//",
            [{"text": "I / would like / glass / orange "}, {"text": "juice", "tooltip": {"vi": "nước ép", "ipa": "dʒuːs"}}, {"text": " / please /.//"}],
            ["I would like a glass of orange juice, please.", "I would like a glass of orange juice please."],
            "I would like a glass of orange juice, please.",
            "S + would like + a glass of + đồ uống",
            ["✅ Dùng 'would like' để yêu cầu lịch sự.", "✅ 'a glass of' (một ly/cốc)."],
            []),
    make_q2("q6", "the children / play / hide and seek / garden / now /.//",
            [{"text": "the children / play / hide and "}, {"text": "seek", "tooltip": {"vi": "tìm kiếm (trò trốn tìm)", "ipa": "siːk"}}, {"text": " / garden / now /.//"}],
            ["The children are playing hide and seek in the garden now."],
            "The children are playing hide and seek in the garden now.",
            "S + be + V-ing + in the + nơi chốn + now",
            ["✅ Dấu hiệu 'now' -> Hiện tại tiếp diễn: 'are playing'.", "✅ 'hide and seek' (trò trốn tìm)."],
            []),
    make_q2("q7", "let's / go / beach / and / build / sandcastles /.//",
            [{"text": "let's / go / beach / and / build / "}, {"text": "sandcastles", "tooltip": {"vi": "lâu đài cát", "ipa": "ˈsændˌkɑːslz"}}, {"text": " /.//"}],
            ["Let's go to the beach and build sandcastles."],
            "Let's go to the beach and build sandcastles.",
            "Let's + V1 + and + V2",
            ["✅ 'Let's' + động từ nguyên mẫu để rủ rê/đề nghị.", "✅ 'go to the beach' (đi biển)."],
            [])
]

# --- GRADE 3 P2 ---
g3_p2_s1 = [
    make_q1("q1", "we didn't / so / the weather / go camping / was bad /.//",
            [{"text": "we didn't / so / the weather / go "}, {"text": "camping", "tooltip": {"vi": "cắm trại", "ipa": "ˈkæmpɪŋ"}}, {"text": " / was bad /.//"}],
            ["the weather", "was bad,", "so", "we didn't", "go camping"],
            ["the weather", "was bad", "so", "we didn't", "go camping"],  # Wait, punctuation in array without commas is better
            "The weather was bad so we didn't go camping.",
            "S1 + was + adj + so + S2 + didn't + V",
            ["✅ 'so' dùng để chỉ kết quả.", "✅ Cả hai vế đều ở thì quá khứ đơn."],
            []),
    make_q1("q2", "in the zoo / which animal / the biggest / is /?//",
            [{"text": "in the zoo / which animal / the biggest / is /?//"}],
            ["which animal", "is", "the biggest", "in the zoo"],
            ["which animal", "is", "the biggest", "in the zoo"],
            "Which animal is the biggest in the zoo?",
            "Which animal + is + the + so sánh nhất + nơi chốn?",
            ["✅ Dùng 'Which' để hỏi sự lựa chọn.", "✅ 'the biggest' (to nhất) - so sánh nhất của 'big'."],
            []),
    make_q1("q3", "any apples / at the supermarket / she / didn't buy /.//",
            [{"text": "any apples / at the supermarket / she / didn't buy /.//"}],
            ["she", "didn't buy", "any apples", "at the supermarket"],
            ["she", "didn't buy", "any apples", "at the supermarket"],
            "She didn't buy any apples at the supermarket.",
            "S + didn't buy + any + N(số nhiều) + tại nơi chốn",
            ["✅ Dùng 'any' trong câu phủ định (didn't buy)."],
            []),
    make_q1("q4", "for school / why / late / yesterday / were you /?//",
            [{"text": "for school / why / late / yesterday / were you /?//"}],
            ["why", "were you", "late", "for school", "yesterday"],
            ["why", "were you", "late", "for school", "yesterday"],
            "Why were you late for school yesterday?",
            "Why + were + S + late for school + thời gian?",
            ["✅ Câu hỏi lý do trong quá khứ dùng 'Why were...'.", "✅ 'be late for' (trễ cho việc gì)."],
            [])
]
# Fix word bank format for Q1
g3_p2_s1[0]['word_bank'] = ["the weather", "was bad", "so", "we didn't", "go camping"]

g3_p2_s2 = [
    make_q2("q5", "my father / usually / drink / coffee / the morning /.//",
            [{"text": "my father / usually / drink / coffee / the morning /.//"}],
            ["My father usually drinks coffee in the morning."],
            "My father usually drinks coffee in the morning.",
            "S + trạng từ chỉ tần suất + V + O + in the morning",
            ["✅ 'usually' chỉ thói quen -> Hiện tại đơn.", "✅ Động từ 'drinks' thêm 's' vì 'My father' là số ít."],
            []),
    make_q2("q6", "she / be / going to / visit / grandparents / tomorrow /.//",
            [{"text": "she / be / going to / visit / grandparents / tomorrow /.//"}],
            ["She is going to visit her grandparents tomorrow.", "She is going to visit grandparents tomorrow."],
            "She is going to visit her grandparents tomorrow.",
            "S + is going to + V + (her) grandparents + tomorrow",
            ["✅ 'tomorrow' -> Tương lai gần: 'be going to'.", "✅ 'She' đi với to be 'is'."],
            []),
    make_q2("q7", "they / play / football / after school / yesterday /?//",
            [{"text": "they / play / football / after school / yesterday /?//"}],
            ["Did they play football after school yesterday?"],
            "Did they play football after school yesterday?",
            "Did + S + play + môn thể thao + after school + thời gian?",
            ["✅ Câu hỏi Yes/No ở quá khứ mượn trợ động từ 'Did' lên đầu.", "✅ Động từ 'play' giữ nguyên mẫu."],
            [])
]

# --- GRADE 3 P3 ---
g3_p3_s1 = [
    make_q1("q1", "we drink / how much / water / should / every day /?//",
            [{"text": "we drink / how much / water / should / every day /?//"}],
            ["how much", "water", "should", "we drink", "every day"],
            ["how much", "water", "should", "we drink", "every day"],
            "How much water should we drink every day?",
            "How much + danh từ không đếm được + should + S + V + trạng từ?",
            ["✅ 'water' không đếm được nên dùng 'How much'.", "✅ 'should we drink' để hỏi lời khuyên."],
            []),
    make_q1("q2", "tall buildings / there are / in my city / many /.//",
            [{"text": "tall buildings / there are / in my city / many /.//"}],
            ["there are", "many", "tall buildings", "in my city"],
            ["there are", "many", "tall buildings", "in my city"],
            "There are many tall buildings in my city.",
            "There are + many + danh từ số nhiều + in + nơi chốn",
            ["✅ Dùng 'There are' cho danh từ số nhiều ('buildings')."],
            []),
    make_q1("q3", "his keys / he / this morning / couldn't find /.//",
            [{"text": "his keys / he / this morning / couldn't find /.//"}],
            ["he", "couldn't find", "his keys", "this morning"],
            ["he", "couldn't find", "his keys", "this morning"],
            "He couldn't find his keys this morning.",
            "S + couldn't + V + O + thời gian",
            ["✅ 'couldn't' là phủ định của 'could' (quá khứ của can) chỉ sự không thể trong quá khứ."],
            []),
    make_q1("q4", "to watch / tonight / a movie / are you / going /?//",
            [{"text": "to watch / tonight / a movie / are you / going /?//"}],
            ["are you", "going", "to watch", "a movie", "tonight"],
            ["are you", "going", "to watch", "a movie", "tonight"],
            "Are you going to watch a movie tonight?",
            "Are + you + going to + V + O + thời gian?",
            ["✅ Cấu trúc tương lai gần 'be going to' dạng câu hỏi."],
            [])
]
g3_p3_s2 = [
    make_q2("q5", "my mother / cook / better / than / my sister /.//",
            [{"text": "my mother / cook / better / than / my sister /.//"}],
            ["My mother cooks better than my sister."],
            "My mother cooks better than my sister.",
            "S1 + V + better than + S2",
            ["✅ 'better' là so sánh hơn của 'well' hoặc 'good'.", "✅ Động từ 'cooks' thêm 's'."],
            []),
    make_q2("q6", "we / must / turn off / lights / before / leave / room /.//",
            [{"text": "we / must / turn off / lights / before / leave / room /.//"}],
            ["We must turn off the lights before leaving the room.", "We must turn off lights before leaving the room."],
            "We must turn off the lights before leaving the room.",
            "S + must + V + before + V-ing",
            ["✅ Dùng 'must' chỉ sự bắt buộc.", "✅ Sau giới từ 'before' động từ phải ở dạng V-ing ('leaving')."],
            []),
    make_q2("q7", "they / travel / Da Nang / plane / last summer /.//",
            [{"text": "they / travel / Da Nang / plane / last summer /.//"}],
            ["They traveled to Da Nang by plane last summer.", "They travelled to Da Nang by plane last summer."],
            "They traveled to Da Nang by plane last summer.",
            "S + V-ed + to + địa điểm + by + phương tiện + thời gian",
            ["✅ 'last summer' -> thì quá khứ đơn ('traveled' hoặc 'travelled').", "✅ Đi bằng phương tiện gì dùng 'by'."],
            [])
]

# --- GRADE 4 P1 ---
g4_p1_s1 = [
    make_q1("q1", "to London / this year / twice / she / has been /.//",
            [{"text": "to London / this year / twice / she / has been /.//"}],
            ["she", "has been", "to London", "twice", "this year"],
            ["she", "has been", "to London", "twice", "this year"],
            "She has been to London twice this year.",
            "S + has been to + nơi chốn + số lần + thời gian",
            ["✅ 'has been to' dùng trong thì Hiện tại hoàn thành để diễn tả trải nghiệm.", "✅ 'twice' (2 lần)."],
            []),
    make_q1("q2", "the most interesting / this is / story / I have ever read /.//",
            [{"text": "the most interesting / this is / story / I have ever read /.//"}],
            ["this is", "the most interesting", "story", "I have ever read"],
            ["this is", "the most interesting", "story", "I have ever read"],
            "This is the most interesting story I have ever read.",
            "This is + the most + tính từ dài + N + S + have ever + V3",
            ["✅ So sánh nhất kết hợp với Hiện tại hoàn thành để nói về trải nghiệm đáng nhớ nhất."],
            []),
    make_q1("q3", "to open / the teacher / our books / told us /.//",
            [{"text": "to open / the teacher / our books / told us /.//"}],
            ["the teacher", "told us", "to open", "our books"],
            ["the teacher", "told us", "to open", "our books"],
            "The teacher told us to open our books.",
            "S + told + O + to-V",
            ["✅ 'tell sb to do sth' (bảo ai làm gì) - dạng mệnh lệnh gián tiếp."],
            []),
    make_q1("q4", "if / you will miss / you don't hurry / the bus /.//",
            [{"text": "if / you will miss / you don't "}, {"text": "hurry", "tooltip": {"vi": "nhanh lên, vội vã", "ipa": "ˈhʌri"}}, {"text": " / the bus /.//"}],
            ["if", "you don't hurry,", "you will miss", "the bus"],
            ["if", "you don't hurry", "you will miss", "the bus"],
            "If you don't hurry, you will miss the bus.",
            "If + S + don't/doesn't + V, S + will + V",
            ["✅ Câu điều kiện loại 1: Mệnh đề If dùng Hiện tại đơn, mệnh đề chính dùng Tương lai đơn."],
            [])
]
# Fix q4 comma logic
g4_p1_s1[3]['word_bank'] = ["if", "you don't hurry", "you will miss", "the bus"]
g4_p1_s1[3]['correct'] = ["if", "you don't hurry", "you will miss", "the bus"]

g4_p1_s2 = [
    make_q2("q5", "swim / river / be / very dangerous /.//",
            [{"text": "swim / river / be / very "}, {"text": "dangerous", "tooltip": {"vi": "nguy hiểm", "ipa": "ˈdeɪndʒərəs"}}, {"text": " /.//"}],
            ["Swimming in the river is very dangerous."],
            "Swimming in the river is very dangerous.",
            "V-ing + in the river + is + adj",
            ["✅ Danh động từ (V-ing) đóng vai trò làm chủ ngữ trong câu ('Swimming').", "✅ Động từ 'be' chia ở số ít ('is')."],
            []),
    make_q2("q6", "how long / you / know / your best friend /?//",
            [{"text": "how long / you / know / your best friend /?//"}],
            ["How long have you known your best friend?"],
            "How long have you known your best friend?",
            "How long + have + S + V3/ed + O?",
            ["✅ Hỏi khoảng thời gian dùng Hiện tại hoàn thành với 'How long'.", "✅ V3 của 'know' là 'known'."],
            []),
    make_q2("q7", "boy / who / wear / red cap / be / my cousin /.//",
            [{"text": "boy / who / wear / red cap / be / my cousin /.//"}],
            ["The boy who is wearing a red cap is my cousin.", "The boy who wears a red cap is my cousin."],
            "The boy who is wearing a red cap is my cousin.",
            "N + who + V + ... + is + N",
            ["✅ Mệnh đề quan hệ 'who' thay thế cho 'The boy'.", "✅ Mô tả trang phục đang mặc dùng tiếp diễn ('is wearing')."],
            [])
]

# --- GRADE 4 P2 ---
g4_p2_s1 = [
    make_q1("q1", "eaten / have you / Japanese food / ever / before /?//",
            [{"text": "eaten / have you / Japanese food / ever / before /?//"}],
            ["have you", "ever", "eaten", "Japanese food", "before"],
            ["have you", "ever", "eaten", "Japanese food", "before"],
            "Have you ever eaten Japanese food before?",
            "Have + S + ever + V3/ed + O + before?",
            ["✅ Hỏi trải nghiệm trong quá khứ dùng Hiện tại hoàn thành với 'ever'."],
            []),
    make_q1("q2", "to help me / he / with my homework / promised /.//",
            [{"text": "to help me / he / with my homework / promised /.//"}],
            ["he", "promised", "to help me", "with my homework"],
            ["he", "promised", "to help me", "with my homework"],
            "He promised to help me with my homework.",
            "S + promised + to-V + sb + with sth",
            ["✅ Cấu trúc 'promise to do sth' (hứa làm gì).", "✅ 'help somebody with something' (giúp ai việc gì)."],
            []),
    make_q1("q3", "the highest / mountain / Everest / in the world / is /.//",
            [{"text": "the highest / mountain / Everest / in the world / is /.//"}],
            ["Everest", "is", "the highest", "mountain", "in the world"],
            ["Everest", "is", "the highest", "mountain", "in the world"],
            "Everest is the highest mountain in the world.",
            "S + is + the + tính từ ngắn-est + N + in the world",
            ["✅ So sánh nhất của tính từ ngắn 'high' là 'the highest'."],
            []),
    make_q1("q4", "play marbles / we / we were small / when / used to /.//",
            [{"text": "play "}, {"text": "marbles", "tooltip": {"vi": "chơi bi", "ipa": "ˈmɑːblz"}}, {"text": " / we / we were small / when / used to /.//"}],
            ["we", "used to", "play marbles", "when", "we were small"],
            ["we", "used to", "play marbles", "when", "we were small"],
            "We used to play marbles when we were small.",
            "S + used to + V + when + S + was/were + adj",
            ["✅ 'used to + V' chỉ thói quen trong quá khứ nay không còn nữa."],
            [])
]
g4_p2_s2 = [
    make_q2("q5", "she / ask / me / what time / train / leave /.//",
            [{"text": "she / ask / me / what time / train / leave /.//"}],
            ["She asked me what time the train would leave.", "She asked me what time the train left."],
            "She asked me what time the train would leave.",
            "S + asked + O + từ để hỏi + S2 + V(lùi thì)",
            ["✅ Câu tường thuật dạng câu hỏi: lùi thì (sẽ rời đi -> would leave, hoặc left)."],
            []),
    make_q2("q6", "it / take / him / twenty minutes / walk / school /.//",
            [{"text": "it / take / him / twenty minutes / walk / school /.//"}],
            ["It takes him twenty minutes to walk to school.", "It took him twenty minutes to walk to school."],
            "It takes him twenty minutes to walk to school.",
            "It takes (sb) + time + to-V",
            ["✅ Cấu trúc chỉ thời gian tiêu tốn để làm việc gì: 'It takes/took + O + thời gian + to-V'."],
            []),
    make_q2("q7", "you / should / stop / eat / too much / fast food /.//",
            [{"text": "you / should / stop / eat / too much / fast food /.//"}],
            ["You should stop eating too much fast food."],
            "You should stop eating too much fast food.",
            "You should stop + V-ing",
            ["✅ 'stop + V-ing': Dừng hẳn việc gì đó (dừng việc ăn thức ăn nhanh)."],
            [])
]

# --- GRADE 4 P3 ---
g4_p3_s1 = [
    make_q1("q1", "in / playing chess / my brother / is interested /.//",
            [{"text": "in / playing "}, {"text": "chess", "tooltip": {"vi": "cờ vua", "ipa": "tʃes"}}, {"text": " / my brother / is interested /.//"}],
            ["my brother", "is interested", "in", "playing chess"],
            ["my brother", "is interested", "in", "playing chess"],
            "My brother is interested in playing chess.",
            "S + be interested in + V-ing",
            ["✅ 'be interested in' (quan tâm, thích thú việc gì).", "✅ Theo sau giới từ 'in' là V-ing."],
            []),
    make_q1("q2", "was / the movie / that / so boring / we fell asleep /.//",
            [{"text": "was / the movie / that / so "}, {"text": "boring", "tooltip": {"vi": "nhàm chán", "ipa": "ˈbɔːrɪŋ"}}, {"text": " / we fell asleep /.//"}],
            ["the movie", "was", "so boring", "that", "we fell asleep"],
            ["the movie", "was", "so boring", "that", "we fell asleep"],
            "The movie was so boring that we fell asleep.",
            "S + be + so + adj + that + mệnh đề",
            ["✅ Cấu trúc 'so... that...' (quá... đến nỗi mà)."],
            []),
    make_q1("q3", "finished / their science project / they / haven't / yet /.//",
            [{"text": "finished / their science project / they / haven't / yet /.//"}],
            ["they", "haven't", "finished", "their science project", "yet"],
            ["they", "haven't", "finished", "their science project", "yet"],
            "They haven't finished their science project yet.",
            "S + haven't/hasn't + V3/ed + O + yet",
            ["✅ 'yet' (chưa) thường dùng ở cuối câu phủ định của thì Hiện tại hoàn thành."],
            []),
    make_q1("q4", "like a bird / fly / I wish / could / I /.//",
            [{"text": "like a bird / fly / I wish / could / I /.//"}],
            ["I wish", "I", "could", "fly", "like a bird"],
            ["I wish", "I", "could", "fly", "like a bird"],
            "I wish I could fly like a bird.",
            "S + wish(es) + S2 + could + V",
            ["✅ Câu ước muốn điều gì đó ở hiện tại dùng 'could' hoặc V2/ed."],
            [])
]
g4_p3_s2 = [
    make_q2("q5", "he / suggest / go / park / for / picnic /.//",
            [{"text": "he / suggest / go / park / for / "}, {"text": "picnic", "tooltip": {"vi": "chuyến dã ngoại", "ipa": "ˈpɪknɪk"}}, {"text": " /.//"}],
            ["He suggested going to the park for a picnic.", "He suggests going to the park for a picnic."],
            "He suggested going to the park for a picnic.",
            "S + suggest(ed) + V-ing + (for a picnic)",
            ["✅ Động từ theo sau 'suggest' phải thêm '-ing'."],
            []),
    make_q2("q6", "book / which / I / borrow / library / be / great /.//",
            [{"text": "book / which / I / borrow / library / be / great /.//"}],
            ["The book which I borrowed from the library is great.", "The book which I borrowed from the library was great."],
            "The book which I borrowed from the library is great.",
            "N + which + S + V2/ed + from + nơi chốn + is + adj",
            ["✅ Dùng mệnh đề quan hệ 'which' cho vật ('The book').", "✅ Mượn từ thư viện: 'borrowed from the library'."],
            []),
    make_q2("q7", "what / you / do / if / you / see / alien /?//",
            [{"text": "what / you / do / if / you / see / "}, {"text": "alien", "tooltip": {"vi": "người ngoài hành tinh", "ipa": "ˈeɪliən"}}, {"text": " /?//"}],
            ["What would you do if you saw an alien?"],
            "What would you do if you saw an alien?",
            "What + would + S + do + if + S + V2/ed + O?",
            ["✅ Câu điều kiện loại 2 giả định tình huống không có thực ở hiện tại: Mệnh đề if dùng quá khứ đơn, mệnh đề chính dùng 'would' + V."],
            [])
]

create_writing_json("WRITING-HARD-GRADE3-P1", 3, 1, g3_p1_s1, g3_p1_s2)
create_writing_json("WRITING-HARD-GRADE3-P2", 3, 2, g3_p2_s1, g3_p2_s2)
create_writing_json("WRITING-HARD-GRADE3-P3", 3, 3, g3_p3_s1, g3_p3_s2)

create_writing_json("WRITING-HARD-GRADE4-P1", 4, 1, g4_p1_s1, g4_p1_s2)
create_writing_json("WRITING-HARD-GRADE4-P2", 4, 2, g4_p2_s1, g4_p2_s2)
create_writing_json("WRITING-HARD-GRADE4-P3", 4, 3, g4_p3_s1, g4_p3_s2)

print("Files generated successfully!")
