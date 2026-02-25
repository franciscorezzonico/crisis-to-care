export const MOCK_POSTS = [
  {
    id: '1',
    author: 'First-Gen Student #47',
    content: "Balancing a 30-hour shift at the DAV while taking a full Kogod load is breaking me. Does anyone else feel like they're just failing everywhere?",
    timestamp: '2 hours ago',
    category: 'Money & Work',
    reactions: 12,
    openToConnect: false,
  },
  {
    id: '2',
    author: 'Anonymous Eagle',
    content: "Visa stress is hitting different today. Every time I see an email from ISSS, my heart stops. Hard to focus on finals like this.",
    timestamp: '5 hours ago',
    category: 'International Student Support',
    reactions: 24,
    openToConnect: true,
  },
  {
    id: '3',
    author: 'First-Gen Student #12',
    content: "Finally went to Kogod office hours today. I was so scared I'd look dumb, but the professor actually helped me map out my whole project. Small win.",
    timestamp: '1 day ago',
    category: 'Wins & Small Victories',
    reactions: 45,
    openToConnect: false,
  },
  {
    id: '4',
    author: 'Anonymous Bear',
    content: "Sometimes it feels like everyone at AU came here with a roadmap and a trust fund. Meanwhile, I'm just trying to figure out what a 'syllabus' is.",
    timestamp: '1 day ago',
    category: 'Belonging & Isolation',
    reactions: 56,
    openToConnect: true,
  },
  {
    id: '5',
    author: 'First-Gen Student #89',
    content: "My parents are so proud I'm at a 'DC school' but they don't understand that being proud doesn't help me pay for these $200 textbooks.",
    timestamp: '2 days ago',
    category: 'Money & Work',
    reactions: 31,
    openToConnect: false,
  },
  {
    id: '6',
    author: 'Anonymous Owl',
    content: "Thinking about the Center for Diversity & Inclusion (CDI) tomorrow. Has anyone gone? Is it actually safe for first-gen students?",
    timestamp: '2 days ago',
    category: 'Belonging & Isolation',
    reactions: 18,
    openToConnect: true,
  },
  {
    id: '7',
    author: 'First-Gen Student #03',
    content: "Just got my emergency grant from AU Financial Aid! I can actually afford groceries for the next two months. Breathing for the first time in weeks.",
    timestamp: '3 days ago',
    category: 'Wins & Small Victories',
    reactions: 102,
    openToConnect: false,
  },
  {
    id: '8',
    author: 'Anonymous Fox',
    content: "Being an international student from Hyderabad and feeling like I have to work 10x harder just to be seen. Imposter syndrome is real.",
    timestamp: '4 days ago',
    category: 'International Student Support',
    reactions: 67,
    openToConnect: true,
  },
  {
    id: '9',
    author: 'First-Gen Student #55',
    content: "Missing my family's cooking so much it hurts. TDR just isn't the same when you're stressed about money and missing home.",
    timestamp: '4 days ago',
    category: 'Belonging & Isolation',
    reactions: 29,
    openToConnect: false,
  },
  {
    id: '10',
    author: 'Anonymous Wolf',
    content: "AU Career Center actually has first-gen mentors! Meeting mine on Tuesday. Hopeful for the first time about what happens after graduation.",
    timestamp: '5 days ago',
    category: 'Academic & Career',
    reactions: 42,
    openToConnect: false,
  },
  {
    id: '11',
    author: 'First-Gen Student #21',
    content: "I'm scared to ask for an extension. I don't want to seem like the 'struggling first-gen kid' but my family needs me home this weekend.",
    timestamp: '6 days ago',
    category: 'Family Expectations',
    reactions: 38,
    openToConnect: true,
  },
  {
    id: '12',
    author: 'Anonymous Hawk',
    content: "Reminder to everyone: You belong at AU. You earned your spot. Don't let the institutional vibe tell you otherwise.",
    timestamp: '1 week ago',
    category: 'Wins & Small Victories',
    reactions: 156,
    openToConnect: false,
  }
];


export const CATEGORIES = [
  'Money & Work',
  'Belonging & Isolation',
  'Family Expectations',
  'Academic Struggles',
  'Discrimination & Identity',
  'Wins & Small Victories'
];

export const NAVIGATOR_PATHWAYS = {
  'money': {
    title: 'Money/Financial Stress',
    description: "I'm worried about financial aid, paying for books, or emergency costs at AU.",
    resources: [
      {
        name: 'AU Financial Aid & Emergency Grants',
        description: 'Assistance for students facing unexpected financial hardships. They offer emergency aid for books, housing, and food.',
        who: 'Any student facing immediate financial strain',
        expect: 'Usually requires a brief explanation of hardship. Decisions can be quick in emergencies.',
        emailTemplate: "Subject: Emergency Financial Assistance Inquiry - [Your Name]\n\nDear Financial Aid Team,\n\nI am reaching out as a first-generation student facing unexpected financial hardship. I would like to inquire about emergency grant options as I'm currently struggling to [reason]. Thank you for your support.\n\nBest,\n[Your Name]",
        location: 'Student Services Building, 2nd Floor',
        link: 'https://www.american.edu/financialaid/'
      },
      {
        name: 'The Market (AU Food Pantry)',
        description: 'Free food and hygiene products for AU students. Completely confidential.',
        who: 'Any AU student in need of food or basic supplies',
        expect: 'Confidential walk-in during open hours; no appointment needed.',
        location: 'Mary Graydon Center (MGC) Basement',
        link: 'https://www.american.edu/student-affairs/the-market/'
      }
    ]
  },
  'academic': {
    title: 'Academic Struggles',
    description: "I'm falling behind in my classes or I'm struggling with the Kogod curriculum.",
    resources: [
      {
        name: 'Kogod Academic Advising',
        description: 'Personalized advising to help you manage your business school coursework and degree requirements.',
        who: 'Kogod School of Business students',
        expect: 'Schedule an appointment online; focus on degree planning and success strategies.',
        emailTemplate: "Subject: Request for Academic Success Meeting - [Your Name]\n\nDear Advisor,\n\nI am a first-gen student in Kogod. I'm finding my current courses very challenging and would like to discuss my academic plan and potential support. Thank you.\n\nBest,\n[Your Name]",
        location: 'Kogod School of Business, Room 101',
        link: 'https://www.american.edu/kogod/advising/'
      },
      {
        name: 'AU Writing Center & Tutoring',
        description: 'Free one-on-one sessions for any subject or writing project.',
        who: 'Any AU student needing academic support',
        expect: 'Schedule online via WC Online; bring your assignment prompt.',
        location: 'Bender Library, 1st Floor',
        link: 'https://www.american.edu/provost/eagle-learning-center/writing-center/'
      }
    ]
  },
  'identity': {
    title: 'Belonging & Identity',
    description: "I'm looking for community, First-Gen Eagle peers, or support for international student life.",
    resources: [
      {
        name: 'Center for Diversity & Inclusion (CDI)',
        description: 'Hub for first-gen students, students of color, and the LGBTQ+ community. Home of the First-Gen Eagle programs.',
        who: 'First-gen students, international students, and anyone looking for inclusive community',
        expect: 'Safe space to study, hang out, and meet mentors who share your identity.',
        emailTemplate: "Subject: Inquiry about First-Gen Student Programs\n\nHi CDI Team,\n\nI'm looking to connect with other first-gen students on campus. Could you share more about your programs and how I can get involved? Thank you.\n\nBest,\n[Your Name]",
        location: 'Mary Graydon Center, Room 201',
        link: 'https://www.american.edu/student-affairs/cdi/'
      },
      {
        name: 'ISSS (International Student Support)',
        description: 'Specialized support for visa status, cultural adjustment, and legal requirements for international students.',
        who: 'International students on F-1 or J-1 visas',
        expect: 'Drop-in hours for quick questions; appointments for complex visa/employment matters.',
        emailTemplate: "Subject: Question about Visa/Status - [Your Name]\n\nDear ISSS Advisor,\n\nI have a question regarding my status and would like to schedule an appointment. Thank you for your help.\n\nBest regards,\n[Your Name]",
        location: 'Bender Library, Suite 410',
        link: 'https://www.american.edu/student-affairs/isss/'
      }
    ]
  }
};

