/* The Number Universe: content database.
   Every claim carries a source type so the interface can keep numerology,
   spiritual tradition, culture and acoustics clearly separate. */
window.NU = (function () {

  /* Core and master numbers, Pythagorean tradition */
  const NUM = {
    0: { k: "Potential", t: "The Infinite Field", e: "Zero is the void before form. In numerology it amplifies the numbers around it and stands for wholeness, possibility and the space before a beginning.",
      s: ["Openness", "Wholeness", "Pure possibility"], c: ["Drifting without form", "Avoidance", "Lack of direction"],
      love: "Unconditional connection and the freedom to begin again.", career: "Fresh starts, pivots and pioneering phases.", money: "A reset point. Clearing before building.", growth: "Stillness, meditation and deep listening." },
    1: { k: "Initiation", t: "The Initiator", e: "One is the first step: independence, leadership and the courage to go first. It is the number of the self and of new beginnings.",
      s: ["Drive", "Originality", "Decisiveness"], c: ["Impatience", "Stubbornness", "Isolation"],
      love: "Needs respect and room to lead. Learns to share the spotlight.", career: "Founders, leaders and self starters.", money: "Earns through initiative and bold moves.", growth: "Balancing will with collaboration." },
    2: { k: "Harmony", t: "The Diplomat", e: "Two is partnership and balance. It carries sensitivity, cooperation and the quiet power of bringing people together.",
      s: ["Empathy", "Tact", "Patience"], c: ["Indecision", "Over sensitivity", "People pleasing"],
      love: "Deeply devoted. Thrives in harmony and true partnership.", career: "Mediation, counseling, design and the support roles behind great outcomes.", money: "Steady gains through partnership and patience.", growth: "Trusting and voicing your own needs." },
    3: { k: "Expression", t: "The Creator", e: "Three is joy, communication and creative expression. It is the number of the artist, the storyteller and the optimist.",
      s: ["Charisma", "Imagination", "Optimism"], c: ["Scattered energy", "Superficiality", "Mood swings"],
      love: "Playful and affectionate. Needs laughter and conversation.", career: "Arts, media, writing and performance.", money: "Earns through talent, visibility and ideas.", growth: "Focus and follow through." },
    4: { k: "Foundation", t: "The Builder", e: "Four is order, stability and hard work. It is the square, the four directions, the solid base that everything else stands on.",
      s: ["Reliability", "Discipline", "Practicality"], c: ["Rigidity", "Overwork", "Resistance to change"],
      love: "Loyal and steady. Shows love through dependable actions.", career: "Engineering, operations, finance and craft.", money: "Slow and secure. Wealth through systems.", growth: "Flexibility and permission to rest." },
    5: { k: "Freedom", t: "The Adventurer", e: "Five is change, curiosity and experience. It is the number of the senses, of travel and of a restless, adaptable spirit.",
      s: ["Adaptability", "Versatility", "Magnetism"], c: ["Restlessness", "Excess", "Fear of commitment"],
      love: "Needs excitement, variety and space to breathe.", career: "Travel, sales, media and entrepreneurship.", money: "Fluctuates. Comes through movement and opportunity.", growth: "Finding freedom that stays grounded." },
    6: { k: "Devotion", t: "The Nurturer", e: "Six is love, family, beauty and responsibility. It is the caretaker's number, devoted to home, community and harmony.",
      s: ["Compassion", "Harmony", "Devotion"], c: ["Martyrdom", "Control", "Perfectionism"],
      love: "The most romantic and home loving number.", career: "Care, teaching, design and hospitality.", money: "Earns by serving others well.", growth: "Receiving as generously as you give." },
    7: { k: "Wisdom", t: "The Seeker", e: "Seven is introspection, intuition and the search for truth. It is the scholar and the mystic, drawn to what lies beneath the surface.",
      s: ["Depth", "Analysis", "Spiritual insight"], c: ["Isolation", "Skepticism", "Aloofness"],
      love: "Needs depth, trust and privacy.", career: "Research, science, philosophy and technology.", money: "Values meaning over money. Earns through expertise.", growth: "Opening up and trusting others." },
    8: { k: "Abundance", t: "The Powerhouse", e: "Eight is achievement, authority and material mastery. Turned on its side it becomes infinity, the endless loop of effort and reward.",
      s: ["Ambition", "Vision", "Executive strength"], c: ["Workaholism", "Control", "Materialism"],
      love: "Protective and generous. Learns tenderness.", career: "Business, finance, leadership and law.", money: "The classic number of wealth building.", growth: "Using power with integrity." },
    9: { k: "Completion", t: "The Humanitarian", e: "Nine is completion, compassion and service to the wider world. As the last single digit it holds the wisdom of every number before it.",
      s: ["Generosity", "Idealism", "Creativity"], c: ["Letting go", "Emotional distance", "Burnout"],
      love: "Loves widely and deeply, sometimes at the cost of the personal.", career: "Arts, healing, teaching and purpose driven work.", money: "Flows when purpose leads.", growth: "Seeing endings as openings." },
    11: { k: "Illumination", t: "The Illuminator", m: true, e: "Eleven is the first master number, a higher octave of 2. It carries heightened intuition, inspiration and spiritual insight.",
      s: ["Vision", "Inspiration", "Sensitivity"], c: ["Nervous energy", "Self doubt", "Overwhelm"],
      love: "Seeks soul level connection.", career: "Teaching, healing, art and innovation.", money: "Comes through inspiring others.", growth: "Grounding the vision in daily life." },
    22: { k: "Mastery", t: "The Master Builder", m: true, e: "Twenty two is a higher octave of 4. It is the power to turn large dreams into real, lasting structures.",
      s: ["Practical vision", "Leadership", "Discipline"], c: ["Pressure", "Overwhelm", "Rigidity"],
      love: "A steady, committed partner with big plans.", career: "Architecture, institutions and large scale ventures.", money: "Builds lasting wealth through long term vision.", growth: "Patience with the scale of the dream." },
    33: { k: "Compassion", t: "The Master Teacher", m: true, e: "Thirty three is a higher octave of 6. It is devoted to healing, uplifting and teaching others through love.",
      s: ["Compassion", "Wisdom", "Selflessness"], c: ["Self sacrifice", "Burden", "Perfectionism"],
      love: "Loves unconditionally and protectively.", career: "Healing, teaching, counseling and the arts.", money: "Prospers when serving a higher purpose.", growth: "Caring for yourself as you care for others." }
  };

  /* Angel numbers: popular spiritual interpretations */
  const ANGEL = {
    "000": ["Infinite potential", "A clean slate and a reminder of wholeness. Often read as a signal that a new cycle is ready to begin."],
    "111": ["New beginnings", "Read as alignment between thought and reality. A cue to focus on what you want, because a new chapter is opening."],
    "222": ["Balance and harmony", "Trust the timing. Partnerships, patience and cooperation are highlighted."],
    "333": ["Creativity and growth", "Expansion, encouragement and self expression. Often read as a sign of support around you."],
    "444": ["Stability, protection and reassurance", "Solid foundations and protection. Read as a reminder that you are on the right path, so keep building."],
    "555": ["Change and transformation", "Major shifts are underway. A call to release what no longer fits."],
    "666": ["Reflection and rebalancing", "In angel number tradition this is a call to rebalance material and spiritual life, not something ominous."],
    "777": ["Intuition and spiritual awareness", "Inner wisdom, learning and a sense of lucky alignment."],
    "888": ["Abundance and achievement", "Rewards, flow and momentum. Effort beginning to pay off."],
    "999": ["Completion and closure", "A chapter ending to make room for the next. Release and graduate."],
    "1010": ["Awakening", "A step up in awareness and personal development."],
    "1111": ["Alignment and intention", "The best known sequence. Read as a moment to set intentions and notice synchronicity."],
    "1122": ["Partnership in motion", "New beginnings shared with others. Collaboration moving forward."],
    "1212": ["Progress and personal development", "Stay positive and keep growing beyond your comfort zone."],
    "1221": ["Mirror of balance", "Reflection, self trust and give and take in relationships."],
    "1234": ["Step by step", "Progress in the right order. Simplify and take the next step."],
    "1313": ["Growth through change", "Creative energy meeting transformation."],
    "1414": ["Focused foundation", "Fresh energy applied to steady, practical work."],
    "2020": ["Clear vision", "Faith, patience and seeing your path more clearly."],
    "2121": ["Optimism", "Positive thinking supporting a new phase."],
    "2222": ["Deep harmony", "Balance, faith and harmony amplified."],
    "3333": ["Amplified creativity", "Strong encouragement to express and create."],
    "4444": ["Strong protection", "Deep reassurance that the foundation holds."],
    "5555": ["Total transformation", "Sweeping change. Hold on loosely."],
    "717": ["Inner guidance confirmed", "Intuition and fresh starts pointing the same way."],
    "818": ["Abundance cycle", "A prosperous phase closing so another can open."]
  };

  /* Documented cultural and historical symbolism only */
  const CULTURE = {
    "0": "Zero as a true number was developed in Indian mathematics. Brahmagupta set out rules for calculating with zero in 628 CE.",
    "3": "Many traditions organize the sacred in threes, from the Christian Trinity to the Hindu Trimurti of Brahma, Vishnu and Shiva.",
    "4": "In Chinese, Japanese and Korean the word for four sounds like the word for death, so many buildings in East Asia skip the fourth floor.",
    "7": "Seven days of the week, and seven classical planets visible to ancient astronomers: the Sun, the Moon, Mercury, Venus, Mars, Jupiter and Saturn.",
    "8": "In Chinese the word for eight sounds like prosperity. The 2008 Beijing Olympics opened on 8 August 2008 at 8:08 in the evening.",
    "9": "In Japanese one reading of nine, ku, sounds like the word for suffering.",
    "10": "Our base ten counting system most likely comes from counting on ten fingers.",
    "12": "Twelve months, twelve signs of the zodiac, twelve hours on a clock face and twelve animals of the Chinese zodiac.",
    "13": "In Western superstition thirteen is unlucky, a fear called triskaidekaphobia. Many buildings skip a 13th floor.",
    "40": "Forty recurs across Abrahamic scripture: forty days of rain in the flood and forty years in the wilderness.",
    "42": "In Douglas Adams's 1979 novel The Hitchhiker's Guide to the Galaxy, 42 is the answer to the ultimate question of life, the universe and everything.",
    "60": "The Babylonians counted in base sixty, which is why we still have sixty seconds in a minute and sixty minutes in an hour.",
    "108": "Sacred in Hinduism, Buddhism and Jainism. Traditional mala prayer beads have 108 beads.",
    "360": "Degrees in a circle, a convention inherited from Babylonian astronomy and its base sixty mathematics.",
    "666": "In the Book of Revelation, 666 is the number of the beast. Angel number readers interpret the sequence very differently.",
    "777": "Three sevens is the classic jackpot line on slot machines.",
    "888": "Triple eight is especially lucky in Chinese culture, tripling the sound of prosperity."
  };

  /* Frequencies. ev: established | limited | none */
  const SOLF_HIST = "The modern Solfeggio set was popularized in the 1990s by Joseph Puleo and Leonard Horowitz, who said they derived it from a medieval hymn. Medieval solfege named notes rather than fixed frequencies, so this lineage is symbolic rather than historical.";
  const SOLF_EV = "No clinical evidence supports specific effects of this tone.";
  const FREQ = {
    7.83: { n: "Schumann resonance", tr: "Popular in wellness circles as the heartbeat of the Earth.", h: "A real electromagnetic resonance: lightning excites the cavity between the Earth's surface and the ionosphere at about 7.83 Hz. It is an electromagnetic wave, not a sound, so here you hear it shifted up by octaves.", ev: "established", et: "The resonance is measured physics. Claims that it affects human health are unproven." },
    40: { n: "Gamma 40", tr: "Not a traditional tone.", h: "Research teams, including a group at MIT, are testing 40 Hz light and sound stimulation in early studies on Alzheimer's disease.", ev: "limited", et: "Promising early research that is still under active study." },
    111: { n: "The chamber tone", tr: "Linked in sound healing circles with meditation and deep calm.", h: "Acoustic surveys of some Neolithic chambers, including Newgrange in Ireland, found strong resonances between about 95 and 120 Hz. A small study linked tones near 110 Hz with shifts in brain activity.", ev: "limited", et: "A few small, early studies. Interesting, but far from proven." },
    136.1: { n: "Om, the Earth year tone", tr: "Used to tune singing bowls and chant.", h: "Calculated by Swiss mathematician Hans Cousto in 1978 by shifting the length of the Earth's year up 32 octaves into hearing range.", ev: "none", et: "A calculated symbol rather than a measured effect." },
    174: { n: "Solfeggio 174", tr: "Associated with grounding, safety and easing tension.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    256: { n: "Scientific pitch C", tr: "Favored by some acousticians because every C becomes a power of two.", h: "Also called philosophical pitch. It places A near 430.5 Hz.", ev: "established", et: "A defined tuning convention, not a claim." },
    285: { n: "Solfeggio 285", tr: "Associated with renewal and restoration.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    396: { n: "Solfeggio 396, Ut", tr: "Associated with releasing fear and guilt.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    417: { n: "Solfeggio 417, Re", tr: "Associated with clearing the way for change.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    432: { n: "Verdi's A", tr: "Favored by some musicians and listeners who describe it as warmer and more natural.", h: "Pitch standards varied widely for centuries. France fixed A at 435 Hz in 1859, Verdi argued for a lower A near 432 Hz in 1884, and 440 Hz became the international standard in 1939.", ev: "limited", et: "One small 2019 study reported a slight drop in heart rate compared with 440 Hz. Much more research is needed." },
    440: { n: "Concert pitch A4", tr: "The reference pitch of modern music.", h: "Agreed at an international conference in London in 1939 and later published as the ISO 16 standard.", ev: "established", et: "A defined standard rather than a claim." },
    528: { n: "Solfeggio 528, Mi", tr: "Associated with transformation, and widely called the love frequency.", h: SOLF_HIST, ev: "limited", et: "A handful of small preliminary studies report relaxation effects. Nothing conclusive." },
    639: { n: "Solfeggio 639, Fa", tr: "Associated with connection and relationships.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    741: { n: "Solfeggio 741, Sol", tr: "Associated with expression, clarity and problem solving.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    852: { n: "Solfeggio 852, La", tr: "Associated with intuition and inner awareness.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    963: { n: "Solfeggio 963", tr: "Associated with oneness and higher awareness.", h: SOLF_HIST, ev: "none", et: SOLF_EV },
    1000: { n: "The reference tone", tr: "Not a traditional tone.", h: "Audio engineers calibrate equipment with a 1 kHz tone. It is the classic broadcast test bleep.", ev: "established", et: "A measurement standard rather than a claim." }
  };
  /* Number named tones with no tradition of their own */
  [222, 333, 444, 555, 777, 888, 999, 1111].forEach(f => {
    FREQ[f] = { n: f + " Hz", sym: true, tr: "No documented tradition as a tone. Its associations come from the angel number " + f + ", a symbolic link rather than an acoustic one.", h: "Tones named after repeating numbers became popular through meditation videos and streaming playlists in the 2010s.", ev: "none", et: "No research connects this tone to the meaning of the number " + f + "." };
  });

  /* Intentions */
  const INTENT = [
    { id: "love", n: "Love", l: "Opening the heart, connection and self love.", nums: ["222", "6", "33", "1122"], fr: [528, 639], basis: "tradition",
      mix: { name: "Open Heart", layers: [{ k: "tone", f: 528, w: "sine", v: .45, pan: -0.2 }, { k: "tone", f: 639, w: "sine", v: .25, pan: 0.2 }, { k: "amb", type: "ocean", v: .5 }] } },
    { id: "confidence", n: "Confidence", l: "Courage, self belief and stepping forward.", nums: ["1", "111", "8"], fr: [396, 417], basis: "tradition",
      mix: { name: "First Step", layers: [{ k: "tone", f: 396, w: "sine", v: .45, pan: 0 }, { k: "tone", f: 417, w: "triangle", v: .15, pan: 0 }, { k: "amb", type: "wind", v: .3 }] } },
    { id: "abundance", n: "Abundance", l: "Prosperity, flow and receiving.", nums: ["8", "888", "22", "818"], fr: [528, 888], basis: "tradition",
      mix: { name: "Flow", layers: [{ k: "tone", f: 528, w: "sine", v: .4, pan: 0 }, { k: "tone", f: 888, w: "sine", v: .12, pan: 0 }, { k: "amb", type: "rain", v: .3 }] } },
    { id: "focus", n: "Focus", l: "Concentration and steady attention.", nums: ["4", "444", "7"], fr: [40, 432], basis: "mixed",
      mix: { name: "Deep Work", layers: [{ k: "bin", c: 200, b: 16, v: .45 }, { k: "amb", type: "rain", v: .35 }] } },
    { id: "relaxation", n: "Relaxation", l: "Calm, ease and letting the day go.", nums: ["2", "6", "222"], fr: [432, 174], basis: "mixed",
      mix: { name: "Soft Tide", layers: [{ k: "bin", c: 180, b: 10, v: .35 }, { k: "tone", f: 432, w: "sine", v: .2, pan: 0 }, { k: "amb", type: "ocean", v: .5 }] } },
    { id: "creativity", n: "Creativity", l: "Imagination, play and new ideas.", nums: ["3", "333", "5"], fr: [417, 639], basis: "mixed",
      mix: { name: "Daydream", layers: [{ k: "bin", c: 210, b: 6, v: .35 }, { k: "tone", f: 417, w: "sine", v: .2, pan: 0 }, { k: "amb", type: "wind", v: .3 }] } },
    { id: "growth", n: "Personal growth", l: "Learning, stretching and becoming.", nums: ["5", "1212", "1234"], fr: [741, 285], basis: "tradition",
      mix: { name: "Becoming", layers: [{ k: "tone", f: 741, w: "sine", v: .25, pan: 0.15 }, { k: "tone", f: 285, w: "sine", v: .3, pan: -0.15 }, { k: "amb", type: "wind", v: .3 }] } },
    { id: "clarity", n: "Clarity", l: "A clear mind and honest perspective.", nums: ["7", "777", "11"], fr: [852, 963], basis: "tradition",
      mix: { name: "Clear Sky", layers: [{ k: "tone", f: 852, w: "sine", v: .22, pan: -0.1 }, { k: "tone", f: 426, w: "sine", v: .25, pan: 0.1 }, { k: "amb", type: "wind", v: .35 }] } },
    { id: "transformation", n: "Transformation", l: "Change, release and renewal.", nums: ["555", "5", "9"], fr: [528, 417], basis: "tradition",
      mix: { name: "Metamorphosis", layers: [{ k: "tone", f: 417, w: "sine", v: .3, pan: 0 }, { k: "tone", f: 528, w: "sine", v: .25, pan: 0 }, { k: "amb", type: "ocean", v: .35 }] } },
    { id: "sleep", n: "Sleep", l: "Winding down toward deep rest.", nums: ["9", "999", "2"], fr: [174, 136.1], basis: "mixed",
      mix: { name: "Night Shore", layers: [{ k: "bin", c: 150, b: 2.5, v: .3 }, { k: "tone", f: 174, w: "sine", v: .18, pan: 0 }, { k: "amb", type: "ocean", v: .5 }] } },
    { id: "motivation", n: "Motivation", l: "Energy, drive and momentum.", nums: ["1", "111", "1234", "8"], fr: [396, 1000], basis: "mixed",
      mix: { name: "Ignition", layers: [{ k: "bin", c: 220, b: 18, v: .3 }, { k: "tone", f: 396, w: "triangle", v: .2, pan: 0 }, { k: "amb", type: "rain", v: .25 }] } },
    { id: "balance", n: "Emotional balance", l: "Steadiness, peace and equilibrium.", nums: ["2", "22", "222", "6"], fr: [639, 432], basis: "tradition",
      mix: { name: "Equilibrium", layers: [{ k: "tone", f: 432, w: "sine", v: .3, pan: -0.15 }, { k: "tone", f: 639, w: "sine", v: .2, pan: 0.15 }, { k: "amb", type: "rain", v: .4 }] } }
  ];

  const ZONES = [
    [0, 20, "Infrasound", "Below human hearing. Felt as pressure or vibration rather than heard."],
    [20, 60, "Sub bass", "Felt more than heard. Thunder, pipe organ pedals and subwoofers."],
    [60, 250, "Bass", "Warmth and weight. Kick drums, bass guitar and the speaking voice."],
    [250, 500, "Low mids", "Body and fullness. The lower half of most melodies."],
    [500, 2000, "Mids", "The heart of music and speech."],
    [2000, 4000, "Upper mids", "Where human hearing is most sensitive."],
    [4000, 6000, "Presence", "Clarity, consonants and definition."],
    [6000, 12000, "Brilliance", "Sparkle and shimmer."],
    [12000, 20001, "Air", "The top of hearing, the first range to fade with age."],
    [20001, 1e12, "Ultrasound", "Above human hearing. Bats, dolphins and medical imaging live here."]
  ];

  return { NUM, ANGEL, CULTURE, FREQ, INTENT, ZONES };
})();
