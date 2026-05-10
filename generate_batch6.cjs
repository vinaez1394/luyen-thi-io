const fs = require('fs');

const data = [
  // FOOD AND DRINK
  // Starters
  { w: "apple", id: "st-fd-001", cert: "starters", topic: "food_drink", trans: "quả táo", type: "noun", emoji: "🍎", ipa: "/ˈæp.əl/", en: "I eat an apple every day.", vi: "Tôi ăn một quả táo mỗi ngày." },
  { w: "banana", id: "st-fd-002", cert: "starters", topic: "food_drink", trans: "quả chuối", type: "noun", emoji: "🍌", ipa: "/bəˈnæn.ə/", en: "Monkeys love to eat bananas.", vi: "Khỉ rất thích ăn chuối." },
  { w: "bean", id: "st-fd-003", cert: "starters", topic: "food_drink", trans: "hạt đậu", type: "noun", emoji: "🫘", ipa: "/biːn/", en: "I had rice and beans for lunch.", vi: "Tôi đã ăn cơm và hạt đậu vào bữa trưa." },
  { w: "bread", id: "st-fd-004", cert: "starters", topic: "food_drink", trans: "bánh mì", type: "noun", emoji: "🍞", ipa: "/bred/", en: "I like to eat bread with butter.", vi: "Tôi thích ăn bánh mì với bơ." },
  { w: "breakfast", id: "st-fd-005", cert: "starters", topic: "food_drink", trans: "bữa sáng", type: "noun", emoji: "🍳", ipa: "/ˈbrek.fəst/", en: "What did you have for breakfast?", vi: "Bạn đã ăn gì cho bữa sáng?" },
  { w: "burger", id: "st-fd-006", cert: "starters", topic: "food_drink", trans: "bánh kẹp thịt", type: "noun", emoji: "🍔", ipa: "/ˈbɜː.ɡər/", en: "He ordered a chicken burger.", vi: "Anh ấy đã gọi một chiếc bánh kẹp thịt gà." },
  { w: "cake", id: "st-fd-007", cert: "starters", topic: "food_drink", trans: "bánh ngọt", type: "noun", emoji: "🍰", ipa: "/keɪk/", en: "She baked a chocolate cake.", vi: "Cô ấy đã nướng một chiếc bánh sô-cô-la." },
  { w: "candy", id: "st-fd-008", cert: "starters", topic: "food_drink", trans: "kẹo (US)", type: "noun", emoji: "🍬", ipa: "/ˈkæn.di/", en: "Eating too much candy is bad for your teeth.", vi: "Ăn quá nhiều kẹo không tốt cho răng của bạn." },
  { w: "carrot", id: "st-fd-009", cert: "starters", topic: "food_drink", trans: "củ cà rốt", type: "noun", emoji: "🥕", ipa: "/ˈkær.ət/", en: "Rabbits eat carrots.", vi: "Những con thỏ ăn cà rốt." },
  { w: "chicken", id: "st-fd-010", cert: "starters", topic: "food_drink", trans: "thịt gà", type: "noun", emoji: "🍗", ipa: "/ˈtʃɪk.ɪn/", en: "We are having roast chicken for dinner.", vi: "Chúng tôi sẽ ăn gà quay cho bữa tối." },
  { w: "chips", id: "st-fd-011", cert: "starters", topic: "food_drink", trans: "khoai tây chiên (US/UK)", type: "noun", emoji: "🍟", ipa: "/tʃɪps/", en: "I bought a bag of chips.", vi: "Tôi đã mua một túi khoai tây chiên." },
  { w: "chocolate", id: "st-fd-012", cert: "starters", topic: "food_drink", trans: "sô-cô-la", type: "noun", emoji: "🍫", ipa: "/ˈtʃɒk.lət/", en: "Do you like dark chocolate?", vi: "Bạn có thích sô-cô-la đen không?" },
  { w: "coconut", id: "st-fd-013", cert: "starters", topic: "food_drink", trans: "quả dừa", type: "noun", emoji: "🥥", ipa: "/ˈkoʊ.kə.nʌt/", en: "I love drinking coconut water.", vi: "Tôi rất thích uống nước dừa." },
  { w: "dinner", id: "st-fd-014", cert: "starters", topic: "food_drink", trans: "bữa tối", type: "noun", emoji: "🍽️", ipa: "/ˈdɪn.ɚ/", en: "We had dinner at 7 PM.", vi: "Chúng tôi đã ăn tối lúc 7 giờ tối." },
  { w: "drink", id: "st-fd-015", cert: "starters", topic: "food_drink", trans: "đồ uống / uống", type: "noun/verb", emoji: "🥤", ipa: "/drɪŋk/", en: "What would you like to drink?", vi: "Bạn muốn uống gì?" },
  { w: "eat", id: "st-fd-016", cert: "starters", topic: "food_drink", trans: "ăn", type: "verb", emoji: "🍽️", ipa: "/iːt/", en: "I eat an apple every morning.", vi: "Tôi ăn một quả táo mỗi sáng." },
  { w: "egg", id: "st-fd-017", cert: "starters", topic: "food_drink", trans: "quả trứng", type: "noun", emoji: "🥚", ipa: "/eɡ/", en: "She boiled an egg for breakfast.", vi: "Cô ấy luộc một quả trứng cho bữa sáng." },
  { w: "fish", id: "st-fd-018", cert: "starters", topic: "food_drink", trans: "con cá / thịt cá", type: "noun", emoji: "🐟", ipa: "/fɪʃ/", en: "Fish live in the water.", vi: "Cá sống dưới nước." },
  { w: "food", id: "st-fd-019", cert: "starters", topic: "food_drink", trans: "thức ăn", type: "noun", emoji: "🍲", ipa: "/fuːd/", en: "I love Italian food.", vi: "Tôi yêu thức ăn Ý." },
  { w: "fries", id: "st-fd-020", cert: "starters", topic: "food_drink", trans: "khoai tây chiên (US)", type: "noun", emoji: "🍟", ipa: "/fraɪz/", en: "I'd like a burger and fries.", vi: "Tôi muốn một chiếc bánh mì kẹp thịt và khoai tây chiên." },
  { w: "fruit", id: "st-fd-021", cert: "starters", topic: "food_drink", trans: "trái cây", type: "noun", emoji: "🍎", ipa: "/fruːt/", en: "Eat more fresh fruit.", vi: "Hãy ăn nhiều trái cây tươi hơn." },
  { w: "grape", id: "st-fd-022", cert: "starters", topic: "food_drink", trans: "quả nho", type: "noun", emoji: "🍇", ipa: "/ɡreɪp/", en: "These grapes are very sweet.", vi: "Những quả nho này rất ngọt." },
  { w: "ice cream", id: "st-fd-023", cert: "starters", topic: "food_drink", trans: "kem", type: "noun", emoji: "🍦", ipa: "/ˌaɪs ˈkriːm/", en: "He is eating vanilla ice cream.", vi: "Anh ấy đang ăn kem vani." },
  { w: "juice", id: "st-fd-024", cert: "starters", topic: "food_drink", trans: "nước ép", type: "noun", emoji: "🧃", ipa: "/dʒuːs/", en: "I drink orange juice every morning.", vi: "Tôi uống nước cam ép mỗi sáng." },
  { w: "kiwi", id: "st-fd-025", cert: "starters", topic: "food_drink", trans: "quả kiwi", type: "noun", emoji: "🥝", ipa: "/ˈkiː.wiː/", en: "A kiwi is green inside.", vi: "Quả kiwi có màu xanh bên trong." },
  { w: "lemon", id: "st-fd-026", cert: "starters", topic: "food_drink", trans: "quả chanh tây", type: "noun", emoji: "🍋", ipa: "/ˈlem.ən/", en: "Lemons are very sour.", vi: "Những quả chanh tây rất chua." },
  { w: "lemonade", id: "st-fd-027", cert: "starters", topic: "food_drink", trans: "nước chanh", type: "noun", emoji: "🍋", ipa: "/ˌlem.əˈneɪd/", en: "She made cold lemonade for us.", vi: "Cô ấy đã pha nước chanh lạnh cho chúng tôi." },
  { w: "lime", id: "st-fd-028", cert: "starters", topic: "food_drink", trans: "quả chanh ta", type: "noun", emoji: "🍋‍🟩", ipa: "/laɪm/", en: "Add some lime juice to the soup.", vi: "Hãy vắt một chút nước chanh ta vào súp." },
  { w: "lunch", id: "st-fd-029", cert: "starters", topic: "food_drink", trans: "bữa trưa", type: "noun", emoji: "🍱", ipa: "/lʌntʃ/", en: "What did you bring for lunch?", vi: "Bạn mang theo món gì cho bữa trưa?" },
  { w: "mango", id: "st-fd-030", cert: "starters", topic: "food_drink", trans: "quả xoài", type: "noun", emoji: "🥭", ipa: "/ˈmæŋ.ɡoʊ/", en: "This mango is very sweet and juicy.", vi: "Quả xoài này rất ngọt và mọng nước." },
  { w: "meat", id: "st-fd-031", cert: "starters", topic: "food_drink", trans: "thịt", type: "noun", emoji: "🥩", ipa: "/miːt/", en: "I don't eat meat, I am vegetarian.", vi: "Tôi không ăn thịt, tôi là người ăn chay." },
  { w: "meatballs", id: "st-fd-032", cert: "starters", topic: "food_drink", trans: "thịt viên", type: "noun", emoji: "🧆", ipa: "/ˈmiːt.bɑːlz/", en: "We had spaghetti and meatballs.", vi: "Chúng tôi đã ăn mì Ý và thịt viên." },
  { w: "milk", id: "st-fd-033", cert: "starters", topic: "food_drink", trans: "sữa", type: "noun", emoji: "🥛", ipa: "/mɪlk/", en: "Drink a glass of milk before bed.", vi: "Hãy uống một ly sữa trước khi ngủ." },
  { w: "onion", id: "st-fd-034", cert: "starters", topic: "food_drink", trans: "củ hành", type: "noun", emoji: "🧅", ipa: "/ˈʌn.jən/", en: "Chopping onions makes me cry.", vi: "Thái hành tây làm tôi rơi nước mắt." },
  { w: "orange", id: "st-fd-035", cert: "starters", topic: "food_drink", trans: "quả cam", type: "noun", emoji: "🍊", ipa: "/ˈɔːr.ɪndʒ/", en: "Oranges are full of vitamin C.", vi: "Cam chứa rất nhiều vitamin C." },
  { w: "pea", id: "st-fd-036", cert: "starters", topic: "food_drink", trans: "hạt đậu Hà Lan", type: "noun", emoji: "🫛", ipa: "/piː/", en: "We had green peas with our dinner.", vi: "Chúng tôi ăn đậu Hà Lan xanh vào bữa tối." },
  { w: "pear", id: "st-fd-037", cert: "starters", topic: "food_drink", trans: "quả lê", type: "noun", emoji: "🍐", ipa: "/per/", en: "A pear is a sweet fruit.", vi: "Quả lê là một loại trái cây ngọt." },
  { w: "pie", id: "st-fd-038", cert: "starters", topic: "food_drink", trans: "bánh nướng", type: "noun", emoji: "🥧", ipa: "/paɪ/", en: "My mom baked an apple pie.", vi: "Mẹ tôi đã nướng một chiếc bánh táo." },
  { w: "pineapple", id: "st-fd-039", cert: "starters", topic: "food_drink", trans: "quả dứa (khóm)", type: "noun", emoji: "🍍", ipa: "/ˈpaɪnˌæp.əl/", en: "I like pineapple juice.", vi: "Tôi thích nước ép dứa." },
  { w: "potato", id: "st-fd-040", cert: "starters", topic: "food_drink", trans: "củ khoai tây", type: "noun", emoji: "🥔", ipa: "/pəˈteɪ.toʊ/", en: "She made mashed potatoes.", vi: "Cô ấy đã làm món khoai tây nghiền." },
  { w: "rice", id: "st-fd-041", cert: "starters", topic: "food_drink", trans: "cơm, gạo", type: "noun", emoji: "🍚", ipa: "/raɪs/", en: "Vietnamese people eat rice every day.", vi: "Người Việt Nam ăn cơm mỗi ngày." },
  { w: "sausage", id: "st-fd-042", cert: "starters", topic: "food_drink", trans: "xúc xích", type: "noun", emoji: "🌭", ipa: "/ˈsɑː.sɪdʒ/", en: "He grilled a sausage for his hot dog.", vi: "Anh ấy đã nướng một cái xúc xích cho bánh hot dog của mình." },
  { w: "sweet", id: "st-fd-043", cert: "starters", topic: "food_drink", trans: "kẹo (UK)", type: "noun", emoji: "🍬", ipa: "/swiːt/", en: "She gave me a sweet.", vi: "Cô ấy đã cho tôi một chiếc kẹo." },
  { w: "tomato", id: "st-fd-044", cert: "starters", topic: "food_drink", trans: "quả cà chua", type: "noun", emoji: "🍅", ipa: "/təˈmeɪ.toʊ/", en: "I put tomatoes in my salad.", vi: "Tôi cho cà chua vào món rau trộn của mình." },
  { w: "water", id: "st-fd-045", cert: "starters", topic: "food_drink", trans: "nước", type: "noun", emoji: "💧", ipa: "/ˈwɑː.t̬ɚ/", en: "Drink plenty of water.", vi: "Hãy uống nhiều nước." },
  { w: "watermelon", id: "st-fd-046", cert: "starters", topic: "food_drink", trans: "quả dưa hấu", type: "noun", emoji: "🍉", ipa: "/ˈwɑː.t̬ɚˌmel.ən/", en: "Watermelon is my favorite summer fruit.", vi: "Dưa hấu là loại trái cây mùa hè yêu thích của tôi." },

  // Movers
  { w: "bottle", id: "mv-fd-001", cert: "movers", topic: "food_drink", trans: "cái chai", type: "noun", emoji: "🍾", ipa: "/ˈbɑː.t̬əl/", en: "I bought a bottle of water.", vi: "Tôi đã mua một chai nước." },
  { w: "bowl", id: "mv-fd-002", cert: "movers", topic: "food_drink", trans: "cái bát, cái chén", type: "noun", emoji: "🥣", ipa: "/boʊl/", en: "I ate a bowl of soup.", vi: "Tôi đã ăn một bát súp." },
  { w: "cheese", id: "mv-fd-003", cert: "movers", topic: "food_drink", trans: "phô mai", type: "noun", emoji: "🧀", ipa: "/tʃiːz/", en: "Mice like to eat cheese.", vi: "Chuột rất thích ăn phô mai." },
  { w: "coffee", id: "mv-fd-004", cert: "movers", topic: "food_drink", trans: "cà phê", type: "noun", emoji: "☕", ipa: "/ˈkɑː.fi/", en: "My father drinks coffee every morning.", vi: "Bố tôi uống cà phê mỗi buổi sáng." },
  { w: "cup", id: "mv-fd-005", cert: "movers", topic: "food_drink", trans: "cái cốc", type: "noun", emoji: "🍵", ipa: "/kʌp/", en: "Would you like a cup of tea?", vi: "Bạn có muốn một tách trà không?" },
  { w: "glass", id: "mv-fd-006", cert: "movers", topic: "food_drink", trans: "ly thủy tinh", type: "noun", emoji: "🥛", ipa: "/ɡlæs/", en: "She drank a glass of milk.", vi: "Cô ấy đã uống một ly sữa." },
  { w: "hungry", id: "mv-fd-007", cert: "movers", topic: "food_drink", trans: "đói bụng", type: "adjective", emoji: "🤤", ipa: "/ˈhʌŋ.ɡri/", en: "I am very hungry, let's eat.", vi: "Tôi đang rất đói, chúng ta ăn thôi." },
  { w: "milkshake", id: "mv-fd-008", cert: "movers", topic: "food_drink", trans: "sữa lắc", type: "noun", emoji: "🥤", ipa: "/ˈmɪlk.ʃeɪk/", en: "He ordered a chocolate milkshake.", vi: "Anh ấy đã gọi một ly sữa lắc sô-cô-la." },
  { w: "noodles", id: "mv-fd-009", cert: "movers", topic: "food_drink", trans: "mì sợi", type: "noun", emoji: "🍜", ipa: "/ˈnuː.dəlz/", en: "We ate noodles for lunch.", vi: "Chúng tôi đã ăn mì sợi vào bữa trưa." },
  { w: "pancake", id: "mv-fd-010", cert: "movers", topic: "food_drink", trans: "bánh kếp", type: "noun", emoji: "🥞", ipa: "/ˈpæn.keɪk/", en: "I like pancakes with honey.", vi: "Tôi thích ăn bánh kếp với mật ong." },
  { w: "pasta", id: "mv-fd-011", cert: "movers", topic: "food_drink", trans: "mì Ý", type: "noun", emoji: "🍝", ipa: "/ˈpɑː.stə/", en: "Pasta is a popular Italian dish.", vi: "Mì Ý là một món ăn phổ biến của nước Ý." },
  { w: "picnic", id: "mv-fd-012", cert: "movers", topic: "food_drink", trans: "chuyến dã ngoại", type: "noun", emoji: "🧺", ipa: "/ˈpɪk.nɪk/", en: "We had a picnic in the park.", vi: "Chúng tôi đã có một chuyến dã ngoại trong công viên." },
  { w: "plate", id: "mv-fd-013", cert: "movers", topic: "food_drink", trans: "cái đĩa", type: "noun", emoji: "🍽️", ipa: "/pleɪt/", en: "Put the food on the plate.", vi: "Hãy đặt thức ăn lên đĩa." },
  { w: "salad", id: "mv-fd-014", cert: "movers", topic: "food_drink", trans: "món rau trộn", type: "noun", emoji: "🥗", ipa: "/ˈsæl.əd/", en: "I made a healthy salad.", vi: "Tôi đã làm một món rau trộn tốt cho sức khỏe." },
  { w: "sandwich", id: "mv-fd-015", cert: "movers", topic: "food_drink", trans: "bánh kẹp", type: "noun", emoji: "🥪", ipa: "/ˈsæn.wɪtʃ/", en: "He ate a cheese sandwich.", vi: "Anh ấy đã ăn một chiếc bánh mì kẹp phô mai." },
  { w: "sauce", id: "mv-fd-016", cert: "movers", topic: "food_drink", trans: "nước sốt", type: "noun", emoji: "🥫", ipa: "/sɑːs/", en: "Put some tomato sauce on the pasta.", vi: "Hãy cho một ít nước sốt cà chua lên mì Ý." },
  { w: "soup", id: "mv-fd-017", cert: "movers", topic: "food_drink", trans: "món súp", type: "noun", emoji: "🍲", ipa: "/suːp/", en: "Chicken soup is good when you are sick.", vi: "Súp gà rất tốt khi bạn bị ốm." },
  { w: "tea", id: "mv-fd-018", cert: "movers", topic: "food_drink", trans: "trà", type: "noun", emoji: "🍵", ipa: "/tiː/", en: "Would you like a cup of green tea?", vi: "Bạn có muốn một tách trà xanh không?" },
  { w: "thirsty", id: "mv-fd-019", cert: "movers", topic: "food_drink", trans: "khát nước", type: "adjective", emoji: "🥵", ipa: "/ˈθɝː.sti/", en: "I am thirsty, I need some water.", vi: "Tôi đang khát nước, tôi cần uống nước." },
  { w: "vegetable", id: "mv-fd-020", cert: "movers", topic: "food_drink", trans: "rau củ", type: "noun", emoji: "🥦", ipa: "/ˈvedʒ.tə.bəl/", en: "Carrots are a type of vegetable.", vi: "Cà rốt là một loại rau củ." },

  // Flyers
  { w: "biscuit", id: "fl-fd-001", cert: "flyers", topic: "food_drink", trans: "bánh quy (UK)", type: "noun", emoji: "🍪", ipa: "/ˈbɪs.kɪt/", en: "I had a chocolate biscuit with my tea.", vi: "Tôi đã ăn một chiếc bánh quy sô-cô-la cùng với trà." },
  { w: "butter", id: "fl-fd-002", cert: "flyers", topic: "food_drink", trans: "bơ", type: "noun", emoji: "🧈", ipa: "/ˈbʌt̬.ɚ/", en: "Spread some butter on the bread.", vi: "Hãy phết một ít bơ lên bánh mì." },
  { w: "cereal", id: "fl-fd-003", cert: "flyers", topic: "food_drink", trans: "ngũ cốc", type: "noun", emoji: "🥣", ipa: "/ˈsɪr.i.əl/", en: "I eat cereal with milk every morning.", vi: "Tôi ăn ngũ cốc với sữa mỗi sáng." },
  { w: "chopsticks", id: "fl-fd-004", cert: "flyers", topic: "food_drink", trans: "đôi đũa", type: "noun", emoji: "🥢", ipa: "/ˈtʃɑːp.stɪks/", en: "Can you eat with chopsticks?", vi: "Bạn có biết ăn bằng đũa không?" },
  { w: "cookie", id: "fl-fd-005", cert: "flyers", topic: "food_drink", trans: "bánh quy (US)", type: "noun", emoji: "🍪", ipa: "/ˈkʊk.i/", en: "She baked some chocolate chip cookies.", vi: "Cô ấy đã nướng vài chiếc bánh quy sô-cô-la chip." },
  { w: "flour", id: "fl-fd-006", cert: "flyers", topic: "food_drink", trans: "bột mì", type: "noun", emoji: "🌾", ipa: "/flaʊr/", en: "We need flour to make a cake.", vi: "Chúng ta cần bột mì để làm bánh." },
  { w: "fork", id: "fl-fd-007", cert: "flyers", topic: "food_drink", trans: "cái nĩa", type: "noun", emoji: "🍴", ipa: "/fɔːrk/", en: "Use a fork to eat your salad.", vi: "Hãy dùng một chiếc nĩa để ăn món rau trộn của bạn." },
  { w: "honey", id: "fl-fd-008", cert: "flyers", topic: "food_drink", trans: "mật ong", type: "noun", emoji: "🍯", ipa: "/ˈhʌn.i/", en: "Bees make sweet honey.", vi: "Những con ong tạo ra mật ong ngọt ngào." },
  { w: "jam", id: "fl-fd-009", cert: "flyers", topic: "food_drink", trans: "mứt", type: "noun", emoji: "🍓", ipa: "/dʒæm/", en: "I like strawberry jam on my toast.", vi: "Tôi thích mứt dâu tây ăn kèm bánh mì nướng." },
  { w: "knife", id: "fl-fd-010", cert: "flyers", topic: "food_drink", trans: "con dao", type: "noun", emoji: "🔪", ipa: "/naɪf/", en: "Be careful with that sharp knife.", vi: "Hãy cẩn thận với con dao sắc đó." },
  { w: "meal", id: "fl-fd-011", cert: "flyers", topic: "food_drink", trans: "bữa ăn", type: "noun", emoji: "🍽️", ipa: "/miːl/", en: "Dinner is my favourite meal of the day.", vi: "Bữa tối là bữa ăn yêu thích nhất trong ngày của tôi." },
  { w: "olives", id: "fl-fd-012", cert: "flyers", topic: "food_drink", trans: "quả ô-liu", type: "noun", emoji: "🫒", ipa: "/ˈɑː.lɪvz/", en: "I put green olives on my pizza.", vi: "Tôi cho những quả ô-liu xanh lên bánh pizza của mình." },
  { w: "pepper", id: "fl-fd-013", cert: "flyers", topic: "food_drink", trans: "hạt tiêu", type: "noun", emoji: "🧂", ipa: "/ˈpep.ɚ/", en: "Do you want salt and pepper on your food?", vi: "Bạn có muốn thêm muối và hạt tiêu vào thức ăn không?" },
  { w: "piece", id: "fl-fd-014", cert: "flyers", topic: "food_drink", trans: "mẩu, miếng", type: "noun", emoji: "🍰", ipa: "/piːs/", en: "Can I have a piece of cake?", vi: "Cho tôi một miếng bánh ngọt nhé?" },
  { w: "pizza", id: "fl-fd-015", cert: "flyers", topic: "food_drink", trans: "bánh pizza", type: "noun", emoji: "🍕", ipa: "/ˈpiːt.sə/", en: "We ordered a large cheese pizza.", vi: "Chúng tôi đã gọi một chiếc pizza phô mai lớn." },
  { w: "salt", id: "fl-fd-016", cert: "flyers", topic: "food_drink", trans: "muối", type: "noun", emoji: "🧂", ipa: "/sɑːlt/", en: "The soup needs a little more salt.", vi: "Món súp cần thêm một chút muối." },
  { w: "smell", id: "fl-fd-017", cert: "flyers", topic: "food_drink", trans: "ngửi / mùi hương", type: "verb/noun", emoji: "👃", ipa: "/smel/", en: "The flowers smell very nice.", vi: "Những bông hoa tỏa mùi hương rất thơm." },
  { w: "snack", id: "fl-fd-018", cert: "flyers", topic: "food_drink", trans: "món ăn nhẹ", type: "noun", emoji: "🥨", ipa: "/snæk/", en: "I always have a snack in the afternoon.", vi: "Tôi luôn có một bữa ăn nhẹ vào buổi chiều." },
  { w: "spoon", id: "fl-fd-019", cert: "flyers", topic: "food_drink", trans: "cái thìa", type: "noun", emoji: "🥄", ipa: "/spuːn/", en: "You eat soup with a spoon.", vi: "Bạn dùng thìa để ăn súp." },
  { w: "strawberry", id: "fl-fd-020", cert: "flyers", topic: "food_drink", trans: "quả dâu tây", type: "noun", emoji: "🍓", ipa: "/ˈstrɑːˌber.i/", en: "She loves strawberry ice cream.", vi: "Cô ấy thích kem dâu tây." },
  { w: "sugar", id: "fl-fd-021", cert: "flyers", topic: "food_drink", trans: "đường", type: "noun", emoji: "🍚", ipa: "/ˈʃʊɡ.ɚ/", en: "Do you put sugar in your tea?", vi: "Bạn có cho đường vào trà không?" },
  { w: "taste", id: "fl-fd-022", cert: "flyers", topic: "food_drink", trans: "nếm / hương vị", type: "verb/noun", emoji: "👅", ipa: "/teɪst/", en: "This soup tastes delicious.", vi: "Món súp này có vị rất ngon." },
  { w: "yoghurt", id: "fl-fd-023", cert: "flyers", topic: "food_drink", trans: "sữa chua", type: "noun", emoji: "🥣", ipa: "/ˈjoʊ.ɡɚt/", en: "I eat a bowl of yoghurt every day.", vi: "Tôi ăn một bát sữa chua mỗi ngày." },

  // HEALTH
  // Movers
  { w: "cold", id: "mv-hl-001", cert: "movers", topic: "health", trans: "cảm lạnh", type: "noun", emoji: "🤧", ipa: "/koʊld/", en: "He caught a cold because of the rain.", vi: "Anh ấy bị cảm lạnh vì đi mưa." },
  { w: "cough", id: "mv-hl-002", cert: "movers", topic: "health", trans: "ho", type: "verb/noun", emoji: "🗣️", ipa: "/kɑːf/", en: "She has a bad cough.", vi: "Cô ấy bị ho rất nặng." },
  { w: "cry", id: "mv-hl-003", cert: "movers", topic: "health", trans: "khóc", type: "verb", emoji: "😭", ipa: "/kraɪ/", en: "The baby is crying because he is hungry.", vi: "Đứa bé đang khóc vì đói." },
  { w: "dentist", id: "mv-hl-004", cert: "movers", topic: "health", trans: "nha sĩ", type: "noun", emoji: "🦷", ipa: "/ˈden.tɪst/", en: "You should visit the dentist twice a year.", vi: "Bạn nên đến khám nha sĩ hai lần một năm." },
  { w: "doctor", id: "mv-hl-005", cert: "movers", topic: "health", trans: "bác sĩ", type: "noun", emoji: "🩺", ipa: "/ˈdɑːk.tɚ/", en: "The doctor gave me some medicine.", vi: "Bác sĩ đã đưa cho tôi một ít thuốc." },
  { w: "earache", id: "mv-hl-006", cert: "movers", topic: "health", trans: "đau tai", type: "noun", emoji: "👂", ipa: "/ˈɪr.eɪk/", en: "I have a terrible earache today.", vi: "Hôm nay tôi bị đau tai khủng khiếp." },
  { w: "fall", id: "mv-hl-007", cert: "movers", topic: "health", trans: "ngã, rơi", type: "verb", emoji: "🤕", ipa: "/fɑːl/", en: "Be careful not to fall down the stairs.", vi: "Hãy cẩn thận đừng để ngã xuống cầu thang." },
  { w: "fine", id: "mv-hl-008", cert: "movers", topic: "health", trans: "tốt, khỏe", type: "adjective", emoji: "😊", ipa: "/faɪn/", en: "I was sick, but now I feel fine.", vi: "Tôi đã bị ốm, nhưng bây giờ tôi cảm thấy khỏe rồi." },
  { w: "headache", id: "mv-hl-009", cert: "movers", topic: "health", trans: "đau đầu", type: "noun", emoji: "🤕", ipa: "/ˈhed.eɪk/", en: "I have a headache because of the loud noise.", vi: "Tôi bị đau đầu vì tiếng ồn lớn." },
  { w: "hospital", id: "mv-hl-010", cert: "movers", topic: "health", trans: "bệnh viện", type: "noun", emoji: "🏥", ipa: "/ˈhɑː.spɪ.t̬əl/", en: "They took him to the hospital.", vi: "Họ đã đưa anh ấy đến bệnh viện." },
  { w: "ill", id: "mv-hl-011", cert: "movers", topic: "health", trans: "ốm, bệnh", type: "adjective", emoji: "🤒", ipa: "/ɪl/", en: "She cannot go to school because she is ill.", vi: "Cô ấy không thể đến trường vì cô ấy bị ốm." },
  { w: "matter", id: "mv-hl-012", cert: "movers", topic: "health", trans: "vấn đề", type: "noun", emoji: "❓", ipa: "/ˈmæt̬.ɚ/", en: "What is the matter with you?", vi: "Có chuyện gì xảy ra với bạn vậy?" },
  { w: "nurse", id: "mv-hl-013", cert: "movers", topic: "health", trans: "y tá", type: "noun", emoji: "👩‍⚕️", ipa: "/nɝːs/", en: "The nurse helped the doctor.", vi: "Y tá đã giúp đỡ bác sĩ." },
  { w: "sick", id: "mv-hl-014", cert: "movers", topic: "health", trans: "ốm, bệnh", type: "adjective", emoji: "🤢", ipa: "/sɪk/", en: "He felt sick after eating too much.", vi: "Anh ấy cảm thấy buồn nôn sau khi ăn quá nhiều." },
  { w: "stomach-ache", id: "mv-hl-015", cert: "movers", topic: "health", trans: "đau bụng", type: "noun", emoji: "🤰", ipa: "/ˈstʌm.ək.eɪk/", en: "Eating too much candy gives you a stomach-ache.", vi: "Ăn quá nhiều kẹo làm cho bạn bị đau bụng." },
  { w: "temperature", id: "mv-hl-016", cert: "movers", topic: "health", trans: "nhiệt độ, sốt", type: "noun", emoji: "🌡️", ipa: "/ˈtem.pɚ.ə.tʃɚ/", en: "You have a high temperature.", vi: "Bạn đang bị sốt cao." },
  { w: "tired", id: "mv-hl-017", cert: "movers", topic: "health", trans: "mệt mỏi", type: "adjective", emoji: "🥱", ipa: "/taɪrd/", en: "I am very tired after a long walk.", vi: "Tôi rất mệt mỏi sau một chuyến đi bộ dài." },
  { w: "toothache", id: "mv-hl-018", cert: "movers", topic: "health", trans: "đau răng", type: "noun", emoji: "🦷", ipa: "/ˈtuːθ.eɪk/", en: "I have a toothache, I need to see a dentist.", vi: "Tôi bị đau răng, tôi cần đi khám nha sĩ." },

  // Flyers
  { w: "bandage", id: "fl-hl-001", cert: "flyers", topic: "health", trans: "băng gạc", type: "noun", emoji: "🩹", ipa: "/ˈbæn.dɪdʒ/", en: "The nurse put a bandage on my finger.", vi: "Y tá đã quấn một miếng băng gạc lên ngón tay tôi." },
  { w: "chemist", id: "fl-hl-002", cert: "flyers", topic: "health", trans: "hiệu thuốc / dược sĩ", type: "noun", emoji: "💊", ipa: "/ˈkem.ɪst/", en: "I bought some medicine at the chemist.", vi: "Tôi đã mua vài viên thuốc ở hiệu thuốc." },
  { w: "cut", id: "fl-hl-003", cert: "flyers", topic: "health", trans: "vết cắt", type: "noun", emoji: "✂️", ipa: "/kʌt/", en: "I have a small cut on my hand.", vi: "Tôi có một vết cắt nhỏ trên tay." },
  { w: "fall over", id: "fl-hl-004", cert: "flyers", topic: "health", trans: "ngã lộn nhào", type: "verb", emoji: "🤸", ipa: "/fɑːl ˈoʊ.vɚ/", en: "He tripped and fell over.", vi: "Anh ấy bị vấp và ngã lộn nhào." },
  { w: "medicine", id: "fl-hl-005", cert: "flyers", topic: "health", trans: "thuốc", type: "noun", emoji: "💊", ipa: "/ˈmed.ɪ.sən/", en: "Take this medicine twice a day.", vi: "Hãy uống loại thuốc này hai lần một ngày." },
  { w: "x-ray", id: "fl-hl-006", cert: "flyers", topic: "health", trans: "chụp X-quang", type: "noun", emoji: "🩻", ipa: "/ˈeks.reɪ/", en: "The doctor needs an x-ray of your arm.", vi: "Bác sĩ cần chụp phim X-quang cánh tay của bạn." },
];

let sql = `
-- Cập nhật vocabulary_bank với 2 chủ đề mới: food_drink, health
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

// For Family, we only need to update the group_tag to match certificate as they already exist
sql += `
-- UPDATE FAMILY TOPIC TO MATCH group_tag with certificate
UPDATE vocabulary_bank SET group_tag = certificate WHERE topic = 'family';
`;

fs.writeFileSync('src/worker/migrations/0016_seed_food_health_family.sql', sql);
console.log("Generated src/worker/migrations/0016_seed_food_health_family.sql");
