window.siteData = {
  navigation: [
    { id: "home", label: "About", url: "index.html" },
    { id: "publications", label: "Publications", url: "publications.html" },
    { id: "cv", label: "CV", url: "cv.html" },
    { id: "personal", label: "Personal", url: "personal.html" },
  ],

  profile: {
    name: "Geonwoo Cho",
    pronunciation: 'Pronunciation: "Gun-woo"',
    photo: {
      src: "assets/img/geonwoo.jpeg",
      alt: "Geonwoo Cho",
    },
    contact: "geonwoo AT umich.edu",
    links: [
      {
        label: "Email",
        url: "mailto:geonwoo@umich.edu",
        icon: "email",
      },
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/citations?user=9dIWhLEAAAAJ&hl=en",
        icon: "scholar",
      },
      { label: "GitHub", url: "https://github.com/Cho-Geonwoo", icon: "github" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/geonwoo-cho-a8b777206/?skipRedirect=true",
        icon: "linkedin",
      },
      { label: "X", url: "https://x.com/GeonwooC51050", icon: "x" },
    ],
    bio: [
      'I am a Ph.D. student in Computer Science and Engineering at the University of Michigan, Ann Arbor, where I work with Prof. <a href="https://silviupitis.com/">Silviu Pitis</a>.',
      "My long-term ambition is to help solve nuclear fusion. My current research centers on building <strong>foundational models for decision-making</strong>.",
      "I am particularly interested in how learning systems make consequential decisions across <strong>time, goals, and scale</strong>. Concretely, I study practical credit assignment methods for reinforcement learning, the mathematical foundations of goal-conditioned reinforcement learning that extend reliably to multiple goals, and how reinforcement learning shapes the behavior of large models.",
      "Previously, I worked as an MLOps engineer at several companies, gaining hands-on experience deploying large-scale machine learning systems in production.",
    ],
  },

  newsLimit: 8,
  news: [
    {
      date: "Nov 2026",
      text: 'Our paper <a href="https://arxiv.org/abs/2611.02177">ANCHOR: KL-Anchored Adaptation for Stable Offline-to-Online RL</a> has been accepted to the CoRL Workshop on Continually Self-Improving Robots.',
    },
    {
      date: "Aug 2026",
      text: 'I have joined the University of Michigan as a Ph.D. student in Computer Science and Engineering.',
    },
    {
      date: "Jul 2026",
      text: 'Our paper <a href="https://openreview.net/forum?id=vyWu5mz4x0">Receding-Horizon Execution for Action Chunking in Offline-to-Online Reinforcement Learning</a> has been accepted to the ICML Workshop on Decision-Making from Offline Datasets to Online Adaptation.',
    },
    {
      date: "Jan 2026",
      text: 'Our papers <a href="https://arxiv.org/abs/2506.05980">AMPED</a> and <a href="https://arxiv.org/abs/2506.19997">TRACED</a> have been accepted to ICLR 2026. Both papers were previously presented at the CoRL Workshop on Resource-Rational Robot Learning in 2025.',
    },
    {
      date: "Aug 2025",
      text: 'Our paper <a href="https://arxiv.org/abs/2507.02910">Causal-Paced Deep Reinforcement Learning</a> has been selected for an oral presentation at the RLC Workshop on Causal Reinforcement Learning.',
    },
  ],

  publications: [
    {
      year: "2026",
      title: "ANCHOR: KL-Anchored Adaptation for Stable Offline-to-Online RL",
      url: "https://arxiv.org/abs/2611.02177",
      authors: [
        { name: "Geonwoo Cho", self: true },
        { name: "Jaegyun Im", url: "https://jaegyunn.github.io/" },
        { name: "Doyoon Kim", url: "https://cosmos1030.github.io/" },
        { name: "Lexin Li", url: "https://lexinli.biostat.berkeley.edu/" },
      ],
      venues: ["CoRL Workshop on Continually Self-Improving Robots, 2026"],
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2611.02177" },
        { label: "Code", url: "https://github.com/Cho-Geonwoo/ANCHOR" },
      ],
      description:
        "ANCHOR is an offline-to-online reinforcement learning method that stabilizes online fine-tuning by initially anchoring the policy to the offline-pretrained actor, then gradually relaxing this constraint to balance early safety and final performance.",
    },
    {
      year: "2026",
      title:
        "Receding-Horizon Execution for Action Chunking in Offline-to-Online Reinforcement Learning",
      url: "https://openreview.net/forum?id=vyWu5mz4x0",
      authors: [
        {
          name: "Jihwan Lee",
          url: "https://scholar.google.com/citations?user=6CeMbuMAAAAJ",
        },
        { name: "Geonwoo Cho", self: true },
        { name: "Hojun Yi", url: "https://172635.github.io/" },
        { name: "Jaegyun Im", url: "https://jaegyunn.github.io/" },
        { name: "Giseung Park", url: "https://sites.google.com/view/giseung-park" },
        { name: "Sundong Kim", url: "https://sundong.kim/" },
      ],
      venues: [
        "ICML Workshop on Decision-Making from Offline Datasets to Online Adaptation: Black-Box Optimization to Reinforcement Learning, 2026",
      ],
      links: [{ label: "Paper", url: "https://openreview.net/forum?id=vyWu5mz4x0" }],
    },
    {
      year: "2026",
      title:
        "AMPED: Adaptive Multi-objective Projection for balancing Exploration and skill Diversification",
      url: "https://geonwoo.me/amped/",
      authors: [
        { name: "Geonwoo Cho*", self: true },
        { name: "Jaemoon Lee*" },
        { name: "Jaegyun Im", url: "https://jaegyunn.github.io/" },
        { name: "Subi Lee", url: "https://lee-subi.github.io/" },
        {
          name: "Jihwan Lee",
          url: "https://scholar.google.com/citations?hl=en&user=6CeMbuMAAAAJ",
        },
        { name: "Sundong Kim", url: "https://sundong.kim/" },
      ],
      venues: [
        "ICLR, 2026",
        "CoRL Workshop on Resource-Rational Robot Learning, 2025",
      ],
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2506.05980" },
        { label: "Project Page", url: "https://geonwoo.me/amped/" },
        { label: "Code", url: "https://github.com/Cho-Geonwoo/amped" },
      ],
      description:
        "AMPED is a framework for skill-based reinforcement learning that simultaneously maximizes state coverage and skill diversity through several carefully designed components.",
    },
    {
      year: "2026",
      title:
        "TRACED: Transition-aware Regret Approximation with Co-learnability for Environment Design",
      url: "https://arxiv.org/abs/2506.19997",
      authors: [
        { name: "Geonwoo Cho", self: true },
        { name: "Jaegyun Im", url: "https://jaegyunn.github.io/" },
        {
          name: "Jihwan Lee",
          url: "https://scholar.google.com/citations?hl=en&user=6CeMbuMAAAAJ",
        },
        { name: "Hojun Yi", url: "https://172635.github.io/" },
        { name: "Sejin Kim", url: "https://sejinkimm.github.io/" },
        { name: "Sundong Kim", url: "https://sundong.kim/" },
      ],
      venues: [
        "ICLR, 2026",
        "CoRL Workshop on Resource-Rational Robot Learning, 2025",
      ],
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2506.19997" },
        { label: "Project Page", url: "https://geonwoo.me/traced/" },
        { label: "Code", url: "https://github.com/Cho-Geonwoo/TRACED" },
      ],
      description:
        "TRACED is an unsupervised environment design (UED) framework that constructs adaptive curricula by prioritizing tasks based on both how challenging they are and how much they transfer knowledge to other tasks.",
    },
    {
      year: "2025",
      title: "Causal-Paced Deep Reinforcement Learning",
      url: "https://arxiv.org/abs/2507.02910",
      authors: [
        { name: "Geonwoo Cho", self: true },
        { name: "Jaegyun Im", url: "https://jaegyunn.github.io/" },
        { name: "Doyoon Kim", url: "https://cosmos1030.github.io/" },
        { name: "Sundong Kim", url: "https://sundong.kim/" },
      ],
      venues: [
        "RLC Workshop on The Causal Reinforcement Learning, 2025 (Oral)",
      ],
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2507.02910" },
        { label: "Code", url: "https://github.com/Cho-Geonwoo/CP-DRL" },
      ],
      description:
        "CP-DRL is a causally-aware curriculum that infers SCM differences from interaction data and sequences tasks according to the resulting causal structural variations across environments.",
    },
  ],

  cv: {
    pdf: "assets/CV.pdf",
    sections: [
      {
        title: "Basics",
        entries: [
          { title: "Name", meta: "Geonwoo Cho" },
          { title: "Email", meta: "geonwoo AT umich.edu" },
        ],
      },
      {
        title: "Education",
        entries: [
          {
            title: "University of Michigan, Ann Arbor",
            meta: "Aug 2026 - Present",
            details: ["Ph.D. in Computer Science and Engineering"],
          },
          {
            title: "Gwangju Institute of Science and Technology",
            meta: "Feb 2019 - Aug 2026",
            details: [
              "B.S. in Electrical Engineering and Computer Science",
              "Cum Laude",
              "Minor in Mathematics",
            ],
          },
          {
            title: "University of California, Berkeley",
            meta: "Jan 2025 - Aug 2025",
            details: ["Exchange Student"],
          },
          {
            title: "Korea Science Academy of KAIST",
            meta: "Mar 2016 - Feb 2019",
          },
        ],
      },
      {
        title: "Research",
        entries: [
          {
            title: "University of Michigan, Ann Arbor",
            meta: "Aug 2026 - Present",
            details: ['Reinforcement Learning, advised by Prof. <a href="https://silviupitis.com/">Silviu Pitis</a>'],
          },
          {
            title: "UCLA, Statistics and Data Science",
            meta: "June 2025 - Aug 2026",
            details: ['Continuous-time Reinforcement Learning, advised by Prof. <a href="https://www.yuhuazhu.org/">Yuhua Zhu</a>'],
          },
          {
            title: "Berkeley, Biostatistics",
            meta: "Jan 2025 - Aug 2026",
            details: ['Offline-to-Online Reinforcement Learning, advised by Prof. <a href="https://lexinli.biostat.berkeley.edu/">Lexin Li</a>'],
          },
          {
            title: "GIST, Data Science Lab",
            meta: "Apr 2024 - Aug 2026",
            details: ['Unsupervised Environment Design and Skill-based Reinforcement Learning, advised by Prof. <a href="https://sundong.kim/">Sundong Kim</a>'],
          },
        ],
      },
      {
        title: "Work",
        entries: [
          {
            title: "Team Learners",
            meta: "Aug 2023 - Jan 2024",
            details: ["Machine Learning Software Engineer"],
          },
          {
            title: "Match Group/Hyperconnect LLC",
            meta: "Jun 2022 - Jul 2023",
            details: [
              "Machine Learning Software Engineer",
              "Worked as part of the mandatory military service in the Republic of Korea",
            ],
          },
          {
            title: "Business Canvas",
            meta: "Dec 2021 - Jun 2022",
            details: ["Software Engineer"],
          },
          {
            title: "Algorima",
            meta: "Dec 2020 - Jun 2021",
            details: ["Software Engineer"],
          },
        ],
      },
      {
        title: "Talks",
        entries: [
          {
            title: "Causal-Paced Deep Reinforcement Learning",
            meta: "Aug 2025",
            details: ["Reinforcement Learning Conference Workshop"],
          },
          {
            title: "Feature Store Implementation for Real-Time Recommender Systems",
            meta: "Sep 2024",
            details: ["Dev Night (GIST)"],
          },
        ],
      },
      {
        title: "Awards",
        entries: [
          {
            title: "Gwangju Institute of Science and Technology (GIST)",
            meta: "Aug 2026",
            details: [
              "Future Talent Award",
              "Outstanding Thesis Award",
            ],
          },
        ],
      },
      {
        title: "Service",
        entries: [
          {
            title: "ICLR 2027",
            details: ["Reviewer"],
          },
          {
            title: "CoRL 2026 Workshop on Continually Self-Improving Robots",
            details: ["Reviewer"],
          },
          {
            title: "NeurIPS 2026",
            details: ["Reviewer"],
          },
        ],
      },
    ],
  },

  personal: {
    title: "Personal",
    sections: [
      {
        title: "Climbing & Outdoors",
        body: [
          "Climbing is the activity I enjoy most. I also like running, golf, basketball, and outdoor activities in general.",
        ],
        images: [
          {
            src: "assets/img/personal/climbing-wall.png",
            alt: "Geonwoo climbing on an indoor bouldering wall",
          },
          {
            src: "assets/img/personal/bouldering.png",
            alt: "Geonwoo reaching for a hold while bouldering",
          },
        ],
      },
      {
        title: "Books & Literature",
        body: [
          "I love reading, especially novels, and I have a particular fondness for the works of Charles Dickens.",
        ],
      },
      {
        title: "Chess & Games",
        body: [
          "I am an enthusiastic chess player. I also reached Grandmaster in Overwatch.",
        ],
        images: [
          {
            src: "assets/img/personal/overwatch-grandmaster.jpeg",
            alt: "Overwatch profile showing a Grandmaster rank",
            crop: "bottom-chat",
          },
        ],
      },
    ],
  },
};
