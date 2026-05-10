#!/usr/bin/env python3
"""
generate_emoji_sql.py
Tạo SQL UPDATE statements để gán emoji cho từ còn thiếu trong vocabulary_bank.
Chạy: python3 scripts/generate_emoji_sql.py > src/worker/migrations/0009_emoji_update.sql
"""

# Dictionary: word → emoji
# Dựa trên 230 từ thực tế trong DB
WORD_EMOJI = {
    # ── BODY ──
    "ankle": "🦶",
    "beard": "🧔",
    "chin": "😤",
    "elbow": "💪",
    "forehead": "🤔",
    "heel": "🦶",
    "hip": "🕺",
    "knee": "🦵",
    "shoulder": "🤷",
    "stomach": "🫃",
    "thumb": "👍",
    "wrist": "⌚",

    # ── CLOTHES ──
    "belt": "👔",
    "boots": "👢",
    "cap": "🧢",
    "coat": "🧥",
    "gloves": "🧤",
    "helmet": "⛑️",
    "jacket": "🧥",
    "pyjamas": "😴",
    "raincoat": "🌧️",
    "scarf": "🧣",
    "uniform": "👮",
    "rucksack": "🎒",

    # ── FOOD ──
    "chopsticks": "🥢",
    "cream": "🍦",
    "dessert": "🍰",
    "diet": "🥗",
    "dish": "🍽️",
    "fridge": "🧊",
    "honey": "🍯",
    "jam": "🍓",
    "jug": "🫗",
    "kettle": "♨️",
    "menu": "📋",
    "pepper": "🌶️",
    "recipe": "📝",
    "restaurant": "🍴",
    "sausage": "🌭",
    "spoon": "🥄",
    "sugar": "🍬",
    "tray": "🍱",
    "vegetarian": "🥦",

    # ── ANIMALS ──
    "wing": "🪶",

    # ── FEELINGS ──
    "angry": "😠",
    "bored": "😑",
    "brave": "🦁",
    "confident": "😎",
    "disappointed": "😞",
    "embarrassed": "😳",
    "excited": "🤩",
    "frightened": "😨",
    "jealous": "😒",
    "kind": "🤗",
    "lonely": "🥺",
    "lucky": "🍀",
    "nervous": "😬",
    "proud": "🏆",
    "shy": "🙈",
    "upset": "😢",
    "worried": "😟",

    # ── PLACES ──
    "airport": "✈️",
    "bridge": "🌉",
    "castle": "🏰",
    "cave": "🦇",
    "circus": "🎪",
    "cliff": "🏔️",
    "coast": "🏖️",
    "college": "🎓",
    "desert": "🏜️",
    "factory": "🏭",
    "gallery": "🖼️",
    "harbour": "⚓",
    "hospital": "🏥",
    "island": "🏝️",
    "jungle": "🌿",
    "lake": "🏞️",
    "library": "📚",
    "market": "🛒",
    "museum": "🏛️",
    "ocean": "🌊",
    "palace": "🏯",
    "pond": "🐸",
    "pyramid": "🔺",
    "stadium": "🏟️",
    "supermarket": "🛒",
    "theatre": "🎭",
    "university": "🎓",
    "valley": "🏔️",
    "waterfall": "💧",
    "zoo": "🦁",
    "classroom": "📖",

    # ── TRANSPORT ──
    "ambulance": "🚑",
    "caravan": "🚐",
    "helicopter": "🚁",
    "lorry": "🚛",
    "motorbike": "🏍️",
    "passenger": "🧑‍✈️",
    "railway": "🚂",
    "sailboat": "⛵",
    "skateboard": "🛹",
    "submarine": "🤿",
    "taxi": "🚕",
    "tram": "🚃",
    "van": "🚐",
    "yacht": "⛵",

    # ── SPORTS ──
    "badminton": "🏸",
    "camping": "⛺",
    "chess": "♟️",
    "climbing": "🧗",
    "competition": "🏆",
    "cycling": "🚴",
    "gymnastics": "🤸",
    "hiking": "🥾",
    "hobby": "🎨",
    "prize": "🥇",
    "skiing": "⛷️",
    "snowboarding": "🏂",
    "surfing": "🏄",
    "team": "👥",

    # ── PEOPLE / JOBS ──
    "architect": "🏗️",
    "chef": "👨‍🍳",
    "dentist": "🦷",
    "engineer": "⚙️",
    "farmer": "🌾",
    "firefighter": "🚒",
    "journalist": "📰",
    "librarian": "📚",
    "nurse": "👩‍⚕️",
    "photographer": "📸",
    "pilot": "✈️",
    "scientist": "🔬",
    "vet": "🐾",
    "waiter": "🍽️",
    "guide": "🗺️",
    "patient": "🏥",

    # ── HOME ──
    "attic": "🏠",
    "balcony": "🌤️",
    "carpet": "🪵",
    "ceiling": "🏗️",
    "curtain": "🪟",
    "cushion": "🛋️",
    "drawer": "🗄️",
    "gate": "🚪",
    "lamp": "💡",
    "mattress": "🛏️",
    "mirror": "🪞",
    "pillow": "😴",
    "shelf": "📦",
    "tap": "🚰",

    # ── NATURE ──
    "environment": "🌍",
    "field": "🌾",
    "forest": "🌲",
    "rock": "🪨",
    "sand": "🏖️",
    "stone": "🪨",
    "stream": "💧",

    # ── ADJECTIVES ──
    "ancient": "🏺",
    "bright": "✨",
    "careful": "⚠️",
    "clever": "🧠",
    "comfortable": "😌",
    "dangerous": "⚠️",
    "delicious": "😋",
    "empty": "📭",
    "enormous": "🐘",
    "expensive": "💰",
    "famous": "⭐",
    "fantastic": "🌟",
    "generous": "🎁",
    "important": "❗",
    "wonderful": "🌈",

    # ── MATERIALS ──
    "cotton": "🌿",
    "glass": "🪟",
    "gold": "🥇",
    "leather": "👜",
    "metal": "⚙️",
    "plastic": "♻️",
    "rubber": "🔵",
    "silver": "🥈",
    "wood": "🪵",

    # ── HEALTH ──
    "accident": "🚑",
    "bandage": "🩹",
    "cough": "🤧",
    "fever": "🤒",
    "headache": "😣",
    "medicine": "💊",
    "temperature": "🌡️",
    "toothache": "🦷",

    # ── TIME ──
    "calendar": "📅",
    "century": "🕰️",
    "decade": "📅",
    "diary": "📔",
    "fortnight": "📅",
    "midnight": "🌙",
    "month": "📅",
    "schedule": "📅",
    "season": "🍂",
    "timetable": "📅",
    "weekend": "🎉",

    # ── SCHOOL ──
    "calculator": "🧮",
    "exam": "📝",
    "language": "🗣️",
    "lesson": "📖",
    "notebook": "📓",
    "project": "📊",
    "textbook": "📚",

    # ── VERBS ──
    "borrow": "📤",
    "celebrate": "🎉",
    "collect": "📦",
    "describe": "🗣️",
    "discover": "🔍",
    "explain": "💬",
    "guess": "🤔",
    "improve": "📈",
    "information": "ℹ️",
    "invite": "💌",
    "lend": "🤝",
    "miss": "💔",
    "prefer": "❤️",
    "prepare": "📋",
    "spend": "💸",
    "suggest": "💡",
    "taste": "👅",
    "travel": "✈️",
}

# Tạo SQL
print("-- Auto-generated: emoji update for vocabulary_bank")
print("-- Generated by scripts/generate_emoji_sql.py")
print("-- Total updates:", len(WORD_EMOJI))
print()

for word, emoji in sorted(WORD_EMOJI.items()):
    # Escape single quotes in emoji (safety)
    safe_emoji = emoji.replace("'", "''")
    print(f"UPDATE vocabulary_bank SET emoji = '{safe_emoji}' WHERE word = '{word}' AND (emoji IS NULL OR emoji = '');")

print()
print(f"-- Done: {len(WORD_EMOJI)} words updated")
