// Single source of truth for the project cards (index.html) and detail pages (project.html).
// Images live in assets/projects/<id>/. fit:"contain" shows diagrams uncropped.
window.PROJECTS = [
  {
    id: "wearable-fatigue-detection", group: "AI / Machine Learning", type: "Embedded AI / ML",
    title: "Wearable Fatigue Detection",
    summary: "ESP32 wearable that reads ECG, PPG and motion, then classifies worker fatigue with machine learning.",
    tags: ["Python", "ESP32", "scikit-learn", "ECG", "PPG"],
    github: "https://github.com/dnsakibss/wearable-fatigue-detection",
    cover: "cover.svg",
    overview: "A compact wearable that combines a MAX30102 (PPG), MPU6050 (motion) and AD8232 (single-lead ECG) on an ESP32. R-peaks are detected on the device, the wearer presses a button to label fatigue moments, and a Python pipeline trains classifiers on episode-grouped data so training and test episodes never leak into each other. Built as a capstone project at AIUB.",
    highlights: [
      "On-device ECG R-peak detection with an adaptive baseline filter",
      "Local buzzer/LED alert, plus WiFi telemetry to ThingSpeak/Firebase and optional Telegram alerts",
      "Random Forest gave the best held-out result: F1 0.786, accuracy 0.905, ROC-AUC 0.939",
      "Limits stated openly: one subject, one 35-minute session, self-reported labels"
    ],
    gallery: [
      { src: "workflow.png", caption: "Sensing, alert and logging workflow" },
      { src: "system-architecture.svg", caption: "System architecture" }
    ]
  },
  {
    id: "civiclens-2", group: "Software Engineering", type: "C# / Desktop",
    title: "CivicLens 2.0",
    summary: "Civic complaint management and community news platform built with C# WinForms and SQL Server.",
    tags: ["C#", "WinForms", "SQL Server"],
    github: "https://github.com/dnsakibss/CivicLens2.0",
    cover: "overview.svg",
    overview: "A desktop application that connects citizens with local authorities. Citizens submit and track complaints about civic issues and read a community newsfeed; Admin, Moderator, Police and Journalist roles each get a tailored dashboard. Version 2.0 is a solo update with a redesigned UI, per-complaint chat, media attachments, a paginated newsfeed with comments, and more admin tooling.",
    highlights: [
      "Role-based login with five user types and role-specific dashboards",
      "Real-time chat attached to each complaint",
      "Media attachments and a paginated newsfeed with comments",
      "SQL Server backend with expanded admin tools"
    ],
    gallery: [{ src: "overview.svg", caption: "CivicLens 2.0 overview" }]
  },
  {
    id: "library-management-system", group: "Software Engineering", type: "Web Development",
    title: "Library Management System",
    summary: "Multi-branch library system in PHP and MySQL with dashboards for admins, managers, librarians and members.",
    tags: ["PHP 8", "MySQL", "Bootstrap", "MVC"],
    github: "https://github.com/dnsakibss/LIBRARY-MANAGEMENT-SYSTEM-Web_Tech_Project",
    cover: "cover.png",
    overview: "A web-based system for multi-branch library operations. Members browse the catalog, borrow, renew, reserve and pay fines; librarians manage books and loans; branch managers set lending policies; admins oversee users, branches and audit logs. It uses a front-controller MVC structure on Apache with MySQLi.",
    highlights: [
      "Four roles: member, librarian, branch manager, admin",
      "Borrowing, renewals, reservations, fines and inter-branch transfers",
      "Per-branch lending policies (loan duration, limits, fines)",
      "Book cover uploads, ratings and reviews"
    ],
    gallery: [
      { src: "roles.png", caption: "User roles" },
      { src: "architecture.png", caption: "System architecture" },
      { src: "database.png", caption: "Database schema" }
    ]
  },
  {
    id: "transportation-environment", group: "Graphics & Other Systems", type: "Computer Graphics",
    title: "4-Scene Transportation Environment",
    summary: "Real-time animated 2D simulator in C++ and OpenGL with four interactive transport scenes.",
    tags: ["C++", "OpenGL", "GLUT"],
    github: "https://github.com/dnsakibss/4_SCENE_OF_TRANSPORTATION_ENVIRONMENT_COMPUTER_GRAPHICS",
    cover: "banner.png",
    overview: "Four animated scenes (airport, train, boat and bus) that you switch between from the keyboard. You can also control the weather, toggle day and night, and adjust the animation speed.",
    highlights: [
      "Airport: a plane takes off past a terminal and control tower",
      "Train: runs through hills, a river and trees",
      "Boat: sails past an island and lighthouse",
      "Bus: drives through a city street"
    ],
    gallery: [
      { src: "1_airport_day.png", caption: "Airport (day)" },
      { src: "2_train_day.png", caption: "Train (day)" },
      { src: "3_boat_day.png", caption: "Boat (day)" },
      { src: "4_bus_day.png", caption: "Bus (day)" },
      { src: "1_airport_night.png", caption: "Airport (night)" },
      { src: "3_boat_night.png", caption: "Boat (night)" }
    ]
  },
  {
    id: "hotel-management-system", group: "Graphics & Other Systems", type: "Java",
    title: "Hotel Management System",
    summary: "Java desktop application for rooms, guests, bookings and staff, built on OOP principles.",
    tags: ["Java", "OOP", "Swing GUI"],
    github: "https://github.com/dnsakibss/HOTEL-MANAGEMENT-SYSTEM",
    cover: "cover.png",
    overview: "A GUI-based hotel administration application for managing rooms, guests, bookings and staff. The code is split into entity classes, list managers, GUI panels and interfaces to show object-oriented design.",
    highlights: [
      "Room management: add, update and track availability and types",
      "Guest records and a booking system for check-in, check-out and reservations",
      "Staff management with roles",
      "Clear separation of Entity, EntityList, GUI and Interface layers"
    ],
    gallery: [{ src: "cover.png", caption: "Application window" }]
  },
  {
    id: "project-simulator", group: "Graphics & Other Systems", type: "Software Engineering",
    title: "Project Simulator",
    summary: "Software engineering documentation project for CivicLens: diagrams, requirements and test cases.",
    tags: ["UML", "SDLC", "Testing"],
    github: "https://github.com/dnsakibss/Project-Simulator",
    cover: "Activity_Diagram_CivicLens.png", fit: "contain",
    overview: "A complete set of software engineering artifacts for CivicLens following the software development lifecycle: UML diagrams, a product requirements document, and test case documents for features such as submitting complaints, account creation and user management.",
    highlights: [
      "Activity, class and use case diagrams",
      "Product requirements document (PRD)",
      "Ten test case documents covering core features"
    ],
    gallery: [
      { src: "Activity_Diagram_CivicLens.png", caption: "Activity diagram" },
      { src: "Class_Diagram_CivicLens.png", caption: "Class diagram" },
      { src: "Use_Case_Diagram_CivicLens.png", caption: "Use case diagram" }
    ]
  }
];
