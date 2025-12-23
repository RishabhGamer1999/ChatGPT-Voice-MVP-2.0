import { AppDataModel } from './types';

export const DATA_MODEL: AppDataModel = {
  "metadata": {
    "projectName": "ChatGPT Voice Confidence MVP",
    "version": "1.2.0",
    "lastUpdated": "2025-12-19",
    "author": "Antigravity Team",
    "description": "Data-driven prototype for voice confidence features targeting Hinglish speakers",
    "usageNotes": "Import this JSON into your web application to drive UI states, language examples, and user flows"
  },
  "uiConfig": {
    "buttons": {
      "ccButton": {
        "id": "cc-toggle-btn",
        "label": "CC",
        "fullLabel": "Closed Captions",
        "states": {
          "on": {
            "icon": "subtitles",
            "backgroundColor": "#2F2F2F",
            "textColor": "#FFFFFF",
            "borderColor": "transparent"
          },
          "off": {
            "icon": "subtitles-off",
            "backgroundColor": "#1E1E1E",
            "textColor": "#A0A0A0",
            "borderColor": "transparent"
          }
        },
        "size": {
          "width": "56px",
          "height": "56px"
        },
        "position": {
          "location": "bottom-left",
          "offsetX": "32px",
          "offsetY": "32px"
        },
        "tooltip": {
          "textOn": "Hide live captions",
          "textOff": "Show live captions"
        },
        "ariaLabel": "Toggle real-time captions",
        "keyboardShortcut": "C",
        "animation": {
          "transition": "all 0.2s ease-in-out",
          "hoverScale": 1.05
        }
      },
      "pauseButton": {
        "id": "pause-btn",
        "label": "",
        "size": {
          "width": "80px",
          "height": "80px"
        },
        "colors": {
          "default": "#FFFFFF",
          "hover": "#F0F0F0",
          "active": "#E0E0E0",
          "paused": "#FFFFFF"
        },
        "icon": {
          "listening": "pause",
          "paused": "mic"
        },
        "position": {
          "location": "center-bottom",
          "ariaLabel": "Pause voice input",
          "keyboardShortcut": "Space",
          "hapticFeedback": true
        },
        "animation": {
          "type": "scale",
          "duration": "200ms",
          "easing": "ease-out"
        },
        "states": {
          "listening": {
            "label": "",
            "sublabel": ""
          },
          "paused": {
            "label": "",
            "sublabel": ""
          }
        }
      },
      "endButton": {
        "id": "end-session-btn",
        "label": "End",
        "size": {
          "width": "0px", 
          "height": "0px"
        },
        "colors": {
          "default": "transparent",
          "hover": "transparent",
          "active": "transparent"
        },
        "icon": "x",
        "position": {
            "location": "hidden",
            "offsetX": "0",
            "offsetY": "0"
        },
        "ariaLabel": "Hidden",
        "keyboardShortcut": "None",
        "confirmationRequired": false,
        "autoSaveOnClick": true
      },
      "exitButton": {
        "id": "exit-btn",
        "label": "",
        "size": {
          "width": "56px",
          "height": "56px"
        },
        "colors": {
          "default": "#1E1E1E",
          "hover": "#2F2F2F",
          "active": "#3F3F3F"
        },
        "icon": "x",
        "position": {
          "location": "bottom-right",
          "offsetX": "32px",
          "offsetY": "32px"
        },
        "ariaLabel": "Exit voice mode",
        "keyboardShortcut": "Escape",
        "tooltip": "Exit",
        "confirmationRequired": false,
        "preservesSession": true
      }
    },
    "visualStates": {
      "active": {
        "name": "Active Listening",
        "visualizer": {
          "type": "blob",
          "colors": {
            "primary": "#FFFFFF",
            "secondary": "#FFFFFF",
            "glow": "rgba(255, 255, 255, 0.5)"
          },
          "bars": {
            "count": 1,
            "width": "100%",
            "gap": "0",
            "borderRadius": "50%"
          }
        },
        "background": {
          "color": "#000000",
          "overlay": "transparent"
        }
      },
      "paused": {
        "name": "Privacy Mode",
        "visualizer": {
          "type": "blob-static",
          "colors": {
            "primary": "#FFFFFF",
            "secondary": "#FFFFFF"
          },
          "line": {
            "height": "100px",
            "width": "100px",
            "opacity": 1,
            "borderRadius": "50%"
          }
        },
        "background": {
          "color": "#000000",
          "overlay": "transparent"
        }
      }
    }
  },
  "captionSystem": {
    "settings": {
      "position": {
        "location": "center",
        "verticalAlign": "middle",
        "offsetY": "-120px" 
      },
      "container": {
        "maxWidth": "80%",
        "padding": "0",
        "borderRadius": "0",
        "backgroundColor": "transparent",
        "backdropFilter": "none"
      }
    },
    "typography": {
      "fontFamily": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      "fontSize": "24px",
      "fontWeight": 500,
      "lineHeight": 1.5,
      "color": "#FFFFFF",
      "textAlign": "center"
    },
    "confidenceIndicator": {
      "showThreshold": 0.7,
      "lowConfidenceStyle": {
        "textDecoration": "underline dotted",
        "color": "#A0A0A0"
      },
      "tooltip": "AI is less certain about this word"
    }
  },
  "sampleTranscripts": [], // Legacy support
  "conversations": [
    {
        "id": "conv-tech-interview",
        "category": "Tech Interview",
        "turns": [
            { "id": "t1", "type": "hinglish", "spoken": "React mein useEffect hook kaise kaam karta hai?", "displayed": "React mein useEffect hook kaise kaam karta hai?", "confidence": 0.95, "response": "useEffect side effects ko handle karta hai, jaise data fetching ya DOM manipulation. Yeh component render hone ke baad chalta hai." },
            { "id": "t2", "type": "hinglish", "spoken": "Agar dependency array empty chhod diya toh?", "displayed": "Agar dependency array empty chhod diya toh?", "confidence": 0.92, "response": "Agar dependency array empty hai, toh effect sirf mount hone par ek baar chalega, bilkul componentDidMount ki tarah." },
            { "id": "t3", "type": "hinglish", "spoken": "Aur agar cleanup function return karein toh?", "displayed": "Aur agar cleanup function return karein toh?", "confidence": 0.88, "response": "Woh cleanup function component unmount hone par ya agle effect se pehle execute hoga, memory leaks rokne ke liye." }
        ]
    },
    {
        "id": "conv-cooking",
        "category": "Cooking",
        "turns": [
            { "id": "c1", "type": "hinglish", "spoken": "Aaj dinner ke liye kuch quick recipe batao yaar", "displayed": "Aaj dinner ke liye kuch quick recipe batao yaar", "confidence": 0.96, "response": "Paneer Bhurji try kar sakte ho. Bas 15 minute lagenge. Recipe share karun?" },
            { "id": "c2", "type": "hinglish", "spoken": "Haan, lekin zyada spicy mat banana please", "displayed": "Haan, lekin zyada spicy mat banana please", "confidence": 0.94, "response": "Theek hai, hari mirch kam dalenge aur thoda cream add kar denge taaki taste mild aur rich ho jaye." },
            { "id": "c3", "type": "hinglish", "spoken": "Kya isme matar daal sakte hain?", "displayed": "Kya isme matar daal sakte hain?", "confidence": 0.90, "response": "Bilkul! Matar se texture aur bhi badhiya ho jayega. Frozen matar use karoge ya fresh?" }
        ]
    },
    {
        "id": "conv-travel-japan",
        "category": "Travel",
        "turns": [
            { "id": "j1", "type": "hinglish", "spoken": "Main Japan trip plan kar raha hoon, best season kaunsa hai?", "displayed": "Main Japan trip plan kar raha hoon, best season kaunsa hai?", "confidence": 0.93, "response": "Cherry Blossom (Sakura) dekhne ke liye Spring (March-April) best hai, ya phir Autumn (October-November) ke colourful leaves ke liye." },
            { "id": "j2", "type": "hinglish", "spoken": "Budget thoda tight hai, sasta accommodation milega?", "displayed": "Budget thoda tight hai, sasta accommodation milega?", "confidence": 0.89, "response": "Haan, Capsule Hotels aur Hostels Japan mein kaafi famous aur affordable hain. Business hotels bhi ek accha option hain." },
            { "id": "j3", "type": "hinglish", "spoken": "Tokyo ke alawa aur kahan jaana chahiye?", "displayed": "Tokyo ke alawa aur kahan jaana chahiye?", "confidence": 0.95, "response": "Kyoto zaroor jao temples ke liye, aur Osaka food ke liye. Nara mein deer park bhi bahut popular hai." }
        ]
    },
    {
        "id": "conv-fitness",
        "category": "Fitness",
        "turns": [
            { "id": "f1", "type": "hinglish", "spoken": "Mera weight loss plateau ho gaya hai, kya karoon?", "displayed": "Mera weight loss plateau ho gaya hai, kya karoon?", "confidence": 0.91, "response": "Shayad body adapt ho gayi hai. Workout intensity badhao ya diet mein thoda change laao, jaise protein intake increase karna." },
            { "id": "f2", "type": "hinglish", "spoken": "Cardio zyada karoon ya weight lifting?", "displayed": "Cardio zyada karoon ya weight lifting?", "confidence": 0.94, "response": "Dono ka mix best hai. Weight lifting metabolism boost karta hai aur cardio calorie burn karta hai. HIIT try kiya hai?" }
        ]
    },
    {
        "id": "conv-movie",
        "category": "Entertainment",
        "turns": [
            { "id": "m1", "type": "hinglish", "spoken": "Koi mind-bending sci-fi movie suggest karo", "displayed": "Koi mind-bending sci-fi movie suggest karo", "confidence": 0.97, "response": "'Coherence' dekhi hai? Ya phir 'Predestination'. Dono kaafi dimag ghuma dene wali movies hain." },
            { "id": "m2", "type": "hinglish", "spoken": "Coherence dekhi hai, kuch waise hi vibe mein chahiye", "displayed": "Coherence dekhi hai, kuch waise hi vibe mein chahiye", "confidence": 0.92, "response": "Toh 'Primer' try karo time travel ke liye, ya 'The Endless'. Low budget hain par concept bahut strong hai." }
        ]
    },
    {
        "id": "conv-debug-python",
        "category": "Coding Support",
        "turns": [
            { "id": "p1", "type": "hinglish", "spoken": "Python mein 'List index out of range' error aa raha hai", "displayed": "Python mein 'List index out of range' error aa raha hai", "confidence": 0.95, "response": "Iska matlab tum list ke aise element ko access kar rahe ho jo exist nahi karta. Loop ki range check karo." },
            { "id": "p2", "type": "hinglish", "spoken": "Loop `len(list)` tak chal raha hai", "displayed": "Loop `len(list)` tak chal raha hai", "confidence": 0.93, "response": "Agar loop `range(len(list))` hai toh sahi hai, par agar `range(len(list) + 1)` kar diya toh yeh error aayega. Code dikhao?" }
        ]
    },
    {
        "id": "conv-philosophy",
        "category": "Philosophy",
        "turns": [
            { "id": "ph1", "type": "hinglish", "spoken": "Stoicism ka basic idea kya hai?", "displayed": "Stoicism ka basic idea kya hai?", "confidence": 0.90, "response": "Stoicism sikhata hai ki humein un cheezon par focus karna chahiye jo hamare control mein hain, aur jo bahar hain unhe accept karna chahiye." },
            { "id": "ph2", "type": "hinglish", "spoken": "Iska matlab emotions suppress karna hai?", "displayed": "Iska matlab emotions suppress karna hai?", "confidence": 0.88, "response": "Nahi, suppress nahi, balki unhe samajhna aur unse dominate na hona. Yeh mental resilience ke baare mein hai." }
        ]
    },
    {
        "id": "conv-relationship",
        "category": "Advice",
        "turns": [
            { "id": "r1", "type": "hinglish", "spoken": "Dost naraz hai, sorry kaise bolun?", "displayed": "Dost naraz hai, sorry kaise bolun?", "confidence": 0.96, "response": "Dil se baat karo. Bahaane mat banao, seedha bolo ki galti hui aur tum value karte ho uski dosti." },
            { "id": "r2", "type": "hinglish", "spoken": "Message karun ya call?", "displayed": "Message karun ya call?", "confidence": 0.92, "response": "Call behtar rahega, ya mil ke baat karo. Text mein tone samajhna mushkil hota hai aur galatfehmi badh sakti hai." }
        ]
    },
    {
        "id": "conv-startup",
        "category": "Business",
        "turns": [
            { "id": "s1", "type": "hinglish", "spoken": "MVP build karne mein sabse important kya hai?", "displayed": "MVP build karne mein sabse important kya hai?", "confidence": 0.94, "response": "Speed aur Core Value. Sirf woh features banao jo user ki sabse badi problem solve karein. Fancy UI baad mein dekhna." },
            { "id": "s2", "type": "hinglish", "spoken": "Par agar product unfinished laga toh?", "displayed": "Par agar product unfinished laga toh?", "confidence": 0.91, "response": "Reid Hoffman kehte hain: 'If you are not embarrassed by the first version of your product, you've launched too late.'" }
        ]
    },
    {
        "id": "conv-cricket",
        "category": "Sports",
        "turns": [
            { "id": "cr1", "type": "hinglish", "spoken": "World Cup final mein kya lagta hai kaun jeetega?", "displayed": "World Cup final mein kya lagta hai kaun jeetega?", "confidence": 0.98, "response": "Competition tough hai! India ka batting order strong hai, par Australia ka pressure game hamesha khatarnaak hota hai." },
            { "id": "cr2", "type": "hinglish", "spoken": "Pitch report kaisi hai?", "displayed": "Pitch report kaisi hai?", "confidence": 0.89, "response": "Pitch batting ke liye acchi hai, par shuru mein swing milega. Jo team toss jeetegi woh shayad chase karna pasand karegi." }
        ]
    }
  ],
  "privacyIndicators": {
    "activeListening": {
      "icon": "mic-on",
      "iconColor": "#FFFFFF",
      "pulseAnimation": true,
      "pulseColor": "rgba(255, 255, 255, 0.4)",
      "statusText": "Advanced Voice",
      "badgePosition": "top-left"
    },
    "pausedPrivate": {
      "icon": "mic-off",
      "iconColor": "#718096",
      "pulseAnimation": false,
      "statusText": "Advanced Voice",
      "badgePosition": "top-left"
    },
    "toastNotifications": {
      "enabled": true,
      "position": "top-center",
      "duration": 2500,
      "animations": {
        "enter": "slide-down",
        "exit": "fade-out"
      }
    }
  },
  "trustSignals": [
    {
      "id": "trust-001",
      "trigger": "session-start",
      "message": "Connected to Advanced Voice",
      "icon": "shield-check",
      "type": "info"
    },
    {
      "id": "trust-002",
      "trigger": "pause-activated",
      "message": "Voice Paused",
      "icon": "lock",
      "type": "success"
    },
    {
      "id": "trust-003",
      "trigger": "session-saved",
      "message": "Session Saved",
      "icon": "download",
      "type": "success"
    },
    {
      "id": "trust-004",
      "trigger": "resume-activated",
      "message": "Listening",
      "icon": "mic",
      "type": "info"
    },
    {
        "id": "trust-005",
        "trigger": "hinglish-detected",
        "message": "Hinglish Detected",
        "icon": "globe",
        "type": "success"
    }
  ]
};