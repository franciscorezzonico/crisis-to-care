// Crisis stabilization session component
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, ArrowRight, CheckCircle2, MessageSquare, Heart, Wind, Eye, Hand, Ear } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function CrisisSession() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [intensity, setIntensity] = useState(5);
  const [stressor, setStressor] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [breathState, setBreathState] = useState<'In' | 'Hold' | 'Out'>('In');
  const [breathCount, setBreathCount] = useState(0);

  const [specificIssue, setSpecificIssue] = useState('');

  const counselingContent: Record<
    string,
    {
      intro: string;
      options: string[];
      followUps: Record<string, string>;
    }

  > = {
    'Panic/Anxiety': {
      intro: 
        "It makes sense that your body and mind are on high alert. Panic and anxiety can feel overwhelming, especially when you also have school, work, or family on your plate. You're not weak for feeling this way.",
      options: [
        'Panic attacks during or before class',
        'Constant worrying about grades or the future',
        'Physical symptoms (racing heart, shortness of breath, nausea)',
        'Feeling on edge without knowing why',
      ],
      followUps: {
        'Panic attacks during or before class':
          'Panic before class is very common, especially when you’re carrying a lot of pressure. One step could be talking with a counselor or professor about what class environments feel hardest. Practicing grounding before and after class, plus having a “safe person” you can text, can help you feel less alone with it.',
        'Constant worrying about grades or the future':
          'When you are first-gen, it can feel like every grade is tied to your whole future. It might help to talk with an academic advisor or counselor about how much one class or semester really affects your path, and to build small, realistic plans instead of holding everything in your head alone.',
        'Physical symptoms (racing heart, shortness of breath, nausea)':
          'Those physical symptoms are your nervous system trying to protect you, even if it fires at the wrong times. Slow breathing exercises, grounding, and learning what tends to trigger your body can all help. A counselor or medical provider can also help you understand what is happening physically.',
        'Feeling on edge without knowing why':
          "Feeling on edge without a clear reason is still valid. For a lot of students, especially first-gen students, there are many small stressors stacking up. It may help to write down when you feel that edge the most and bring that to a counselor or trusted person to look for patterns together.",
      },
    },
    'Loneliness': {
      intro: 
        "Feeling lonely on campus is incredibly common, especially if you’re the first in your family to navigate college. It doesn’t mean you don’t belong here.",
      options: [
        'Missing family / home',
        'Hard to make friends on campus',
        'Feeling different from others here',
      ],
      followUps: {
        'Missing family / home':
          'Missing home can be really intense, especially during your first semesters. Staying connected by regular calls or messages can help, but it can also help to create small routines on campus that feel “yours”—like a study spot, club, or weekly event that grounds you here too.',
        'Hard to make friends on campus':
          'Making friends in college often takes longer than people admit. You may find it easier in smaller spaces like study groups, identity-based orgs, or first-gen programs. A counselor or mentor can also help you plan small, low-pressure ways to meet people.',
        'Feeling different from others here':
          'Feeling like you don’t fit the “typical student” image is a very real experience. Many first-gen and marginalized students feel this. Connecting with first-gen student groups, cultural centers, or mentors who share parts of your background can help you feel less alone.',
      },
    },
    'Academic Pressure': {
      intro:
        "Academic pressure can feel like everything is on the line, especially when you’re carrying your family’s hopes or financial realities. That pressure is heavy, not a personal failure.",
      options: [
        'Falling behind in one or more classes',
        'Perfectionism / fear of any mistake',
        'Balancing school with work or caregiving',
      ],
      followUps: {
        'Falling behind in one or more classes':
          'Falling behind happens to many students, even if people don’t talk about it. An important step can be emailing or meeting with your professor or academic advisor to get clear on what’s realistic. You do not have to figure out a catch-up plan alone.',
        'Perfectionism / fear of any mistake':
          'Perfectionism can protect you in some ways, but it also makes every assignment feel like a threat. You might experiment with “good enough” on one or two lower-stakes tasks, and talk with a counselor about where that fear of mistakes comes from and how to loosen its grip a bit.',
        'Balancing school with work or caregiving':
          'Balancing school with work or caregiving is an enormous load, and most systems were not built with that in mind. You may be eligible for support through financial aid, disability services, or flexible arrangements with instructors. Talking this through with a counselor or case manager could open options you haven’t been told about.',
      },
    },
    'Financial Stress': {
      intro:
        "Financial stress can make everything else feel unstable. Worrying about money is not a personal failing; it’s a response to very real pressure.",
      options: [
        'Worried about paying tuition / staying enrolled',
        'Struggling with day-to-day expenses (food, housing)',
        'Sending money home while in school',
      ],
      followUps: {
        'Worried about paying tuition / staying enrolled':
          'If you’re worried about staying enrolled, you’re not alone. A financial aid counselor or student services office may have options you haven’t been told about yet, like payment plans, emergency grants, or different enrollment choices. It can help to schedule a meeting and bring your questions.',
        'Struggling with day-to-day expenses (food, housing)':
          'Day-to-day expenses like food and housing deeply affect your mental health. Many campuses have food pantries, emergency funds, or housing support programs. A counselor, case manager, or first-gen program staff can help connect you to those resources and advocate with you.',
        'Sending money home while in school':
          'Supporting family while in school is an act of care, but it’s also a lot for one person to hold. Talking with a counselor or trusted mentor about this role can help you think through boundaries, options, and ways to care for yourself alongside your family.',
      },
    },
    'Family Issues': {
      intro: 
        "Family stress can be complicated—especially when you’re trying to honor your family and also build your own path. It’s understandable if you feel pulled in different directions.",
      options: [
        'Conflict at home about school choices',
        'Feeling responsible for family problems',
        "Family doesn't understand mental health / counseling",
      ],
      followUps: {
        'Conflict at home about school choices':
          'Disagreements with family about your path can be painful. A counselor or mentor can help you think about how to communicate what this path means to you, and how to set boundaries while still honoring your relationships.',
        'Feeling responsible for family problems':
          'Feeling responsible for family problems is heavy. You didn’t create those problems, and you don’t have to solve them alone. A counselor can help you sort what is truly yours to carry and what might need other forms of support.',
        "Family doesn't understand mental health / counseling":
          'Many families, especially in first-gen communities, have not had good information about counseling. Talking with a counselor yourself can help you decide what feels right for you, even if your family doesn’t fully understand yet.',
      },
    },
    'Discrimination': {
      intro:
        "Experiencing discrimination, bias, or microaggressions is not your fault. It can wear you down over time, especially when you’re already carrying a lot.",
      options: [
        'Bias or microaggressions from peers',
        'Bias or unfairness from faculty/staff',
        'Feeling unsafe in certain campus spaces',
      ],
      followUps: {
        'Bias or microaggressions from peers':
          'Microaggressions from peers can make campus feel less safe. You might talk with a counselor, cultural center, or identity-based org about what you’re experiencing, and explore options for support, reporting, or collective care.',
        'Bias or unfairness from faculty/staff':
          'When bias or unfairness comes from someone in power, it can be very destabilizing. It may help to document what happened and talk with an advocate (such as an ombuds office, cultural center, or trusted staff member) about possible next steps—at your pace.',
        'Feeling unsafe in certain campus spaces':
          'Feeling unsafe in certain spaces matters, even if others don’t see it. Together with a counselor, cultural center, or trusted staff member, you could map out safer routes and spaces, and talk about whether any formal reports or additional protections make sense for you.',
      },
    },
    'Unsure': {
      intro:
        "It’s okay not to know exactly what’s wrong. Sometimes things just feel heavy without a clear label, especially when a lot is happening at once.",
      options: [
        'It feels like "everything" at once',
        'I feel numb or disconnected',
        "I'm not sure, but I know I'm not okay",
      ],
      followUps: {
        'It feels like "everything" at once':
          'When everything hits at once, your brain and body can feel flooded. It might help to slowly list what’s on your plate with a counselor or trusted person so you’re not carrying it all alone in your head.',
        'I feel numb or disconnected':
          'Feeling numb or disconnected can be your mind’s way of protecting you. Gentle activities that reconnect you with your body, senses, or trusted people can help, and a counselor can give you a safe space to explore why this might be happening.',
        "I'm not sure, but I know I'm not okay":
          'Knowing “I’m not okay” is already important information. A counselor or campus support person can help you sort out what’s going on, even if you don’t have the words yet.',
      },
    },
  };

  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setBreathState((prev) => {
          if (prev === 'In') return 'Hold';
          if (prev === 'Hold') return 'Out';
          return 'In';
        });
        if (breathState === 'Out') setBreathCount(c => c + 1);
      }, breathState === 'In' ? 4000 : breathState === 'Hold' ? 2000 : 6000);
      return () => clearInterval(interval);
    }
  }, [step, breathState]);

  const handleNext = () => setStep(step + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-50 bg-earth-terracotta flex items-center justify-center p-6 md:p-12 text-white overflow-y-auto"
          >
            <div className="max-w-2xl w-full space-y-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold">{t.crisis.safetyCheck}</h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans">
                  {t.crisis.immediateHelp}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <a href="tel:988" className="flex items-center gap-4 p-6 bg-white/10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all group">
                  <div className="w-12 h-12 bg-white text-earth-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-lg">{t.crisis.call988}</span>
                    <span className="text-sm text-white/70">Suicide & Crisis Lifeline</span>
                  </div>
                </a>
                <a href="sms:741741?body=HELLO" className="flex items-center gap-4 p-6 bg-white/10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all group">
                  <div className="w-12 h-12 bg-white text-earth-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-lg">{t.crisis.textLine}</span>
                  </div>
                </a>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-5 bg-white text-earth-terracotta rounded-2xl font-bold text-xl hover:bg-white/90 transition-all shadow-xl active:scale-95"
              >
                {t.crisis.continue}
              </button>

              <p className="text-center text-sm text-white/50 italic">
                This is a peer-support tool, not a replacement for professional clinical care.
              </p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 py-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold text-earth-charcoal">{t.crisis.checkIn}</h2>
              <p className="text-earth-charcoal/70">Let's see where you are right now.</p>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-earth-sand/20 shadow-sm">
              <h3 className="font-bold text-earth-sage uppercase tracking-widest text-xs ml-1">{t.crisis.intensityLabel}</h3>
              <div className="space-y-6">
                <input
                  type="range"
                  min="0" max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-3 bg-earth-cream rounded-lg appearance-none cursor-pointer accent-earth-terracotta"
                />
                <div className="flex justify-between items-center bg-earth-cream/50 p-4 rounded-xl">
                  <span className="text-sm font-bold text-earth-sand uppercase">Calm</span>
                  <span className="text-4xl font-serif font-bold text-earth-terracotta">{intensity}</span>
                  <span className="text-sm font-bold text-earth-sand uppercase text-right leading-tight">Extreme<br />Distress</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-earth-sand/20 shadow-sm">
              <h3 className="font-bold text-earth-sage uppercase tracking-widest text-xs ml-1">What's hitting you hardest?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Panic/Anxiety', 'Loneliness', 'Academic Pressure',
                  'Financial Stress', 'Family Issues', 'Discrimination', 'Unsure'
                ].map(option => (
                  <button
                    key={option}
                    onClick={() => setStressor(option)}
                    className={`p-4 text-left rounded-2xl border font-bold transition-all ${stressor === option ? 'bg-earth-sage text-white border-earth-sage shadow-lg shadow-earth-sage/20' : 'bg-white border-earth-sand/20 text-earth-charcoal hover:border-earth-sage'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!stressor}
              className="w-full py-5 bg-earth-sage text-white rounded-2xl font-bold text-xl hover:shadow-xl hover:shadow-earth-sage/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              Start Stabilization Exercise
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 min-h-[60vh] flex flex-col justify-center items-center text-center">
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-serif font-bold text-earth-charcoal">{t.crisis.breathingTitle}</h2>
              <p className="text-earth-charcoal/70 text-lg">
                {t.crisis.breathingSub}
              </p>
            </div>

            <div className="relative flex items-center justify-center p-20">
              <motion.div
                animate={{
                  scale: breathState === 'In' ? 1.5 : breathState === 'Hold' ? 1.55 : 1,
                }}
                transition={{
                  duration: breathState === 'In' ? 4 : breathState === 'Hold' ? 2 : 6,
                  ease: "easeInOut"
                }}
                className={`w-48 h-48 rounded-full border-2 ${breathState === 'In' ? 'bg-earth-sage/10 border-earth-sage' : breathState === 'Hold' ? 'bg-earth-sand/20 border-earth-sand' : 'bg-earth-terracotta/10 border-earth-terracotta'} flex flex-col items-center justify-center shadow-2xl overflow-hidden`}
              >
                <Wind className={`w-10 h-10 mb-2 transition-colors ${breathState === 'In' ? 'text-earth-sage' : breathState === 'Hold' ? 'text-earth-sand' : 'text-earth-terracotta'}`} />
                <span className={`text-4xl font-serif font-bold transition-colors ${breathState === 'In' ? 'text-earth-sage' : breathState === 'Hold' ? 'text-earth-sand' : 'text-earth-terracotta'}`}>
                  {breathState}
                </span>
                <div className="absolute inset-0 bg-white/10 blur-xl"></div>
              </motion.div>

              <div className="absolute -bottom-12 flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${breathCount >= i ? 'bg-earth-sage' : 'bg-earth-sand/20'}`} />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className={`mt-12 px-12 py-4 rounded-2xl font-bold transition-all ${breathCount >= 1 ? 'bg-earth-charcoal text-white hover:shadow-xl' : 'bg-earth-sand/10 text-earth-sand pointer-events-none'}`}
            >
              {breathCount >= 1 ? "I'm feeling a bit more stable" : "Complete at least one cycle"}
            </button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 py-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold text-earth-charcoal text-balance">{t.crisis.groundingTitle}</h2>
              <p className="text-earth-charcoal/70">{t.crisis.groundingSub}</p>
            </div>

            <div className="space-y-4">
              <GroundingItem
                number={5}
                icon={<Eye className="w-5 h-5" />}
                label={t.crisis.grounding.see}
                examples={t.crisis.grounding.seeEx}
              />
              <GroundingItem
                number={3}
                icon={<Hand className="w-5 h-5" />}
                label={t.crisis.grounding.touch}
                examples={t.crisis.grounding.touchEx}
              />
              <GroundingItem
                number={1}
                icon={<Ear className="w-5 h-5" />}
                label={t.crisis.grounding.hear}
                examples={t.crisis.grounding.hearEx}
              />
            </div>

            <button onClick={handleNext} className="w-full py-5 bg-earth-sage text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all">
              Continue to Counselor Refelction
            </button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y: -20}} className="space-y-8 py-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold text-earth-charcoal">
                {stressor
                  ? `Let’s look a bit closer at your ${stressor.toLowerCase()}`
                  : "Let’s look a bit closer at what’s going on"}
              </h2>
              <p className="text-earth-charcoal/70">
                {stressor && counselingContent[stressor]
                  ? counselingContent[stressor].intro
                  : "It’s okay if you’re not sure how to describe it yet. We’ll take it one small step at a time."}
              </p>
            </div>

            {stressor && counselingContent[stressor] && (
              <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-earth-sand/20 shadow-sm">
                <h3 className="font-bold text-earth-sage uppercase tracking-widest text-xs ml-1">
                  Let’s get a bit more specific
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {counselingContent[stressor].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSpecificIssue(opt)}
                      className={`p-4 text-left rounded-2xl border font-bold text-sm transition-all ${
                        specificIssue === opt
                          ? 'bg-earth-sage text-white border-earth-sage shadow-lg shadow-earth-sage/20'
                          : 'bg-white border-earth-sand/20 text-earth-charcoal hover:border-earth-sage'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tailored follow-up based on specific issue */}
            {stressor &&
              specificIssue &&
              counselingContent[stressor] &&
              counselingContent[stressor].followUps[specificIssue] && (
                <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-earth-sand/20 shadow-sm">
                  <h3 className="font-bold text-earth-sage uppercase tracking-widest text-xs ml-1">
                    A counselor might say:
                  </h3>
                  <p className="text-earth-charcoal/80 leading-relaxed">
                    {counselingContent[stressor].followUps[specificIssue]}
                  </p>
                </div>
              )}

            <button
              onClick={handleNext}
              disabled={!specificIssue}
              className="w-full py-5 bg-earth-charcoal text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Action Plan
            </button>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 py-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold text-earth-charcoal font-serif">{t.crisis.planTitle}</h2>
              <p className="text-earth-charcoal/70">{t.crisis.planSub}</p>
            </div>

            <div className="grid gap-3">
              {t.crisis.planActions.map((action: string) => (
                <label
                  key={action}
                  className={`flex items-center gap-4 p-6 rounded-3xl border cursor-pointer transition-all ${actions.includes(action) ? 'bg-earth-sage/10 border-earth-sage ring-2 ring-earth-sage/20' : 'bg-white border-earth-sand/20 hover:border-earth-sand'}`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${actions.includes(action) ? 'bg-earth-sage border-earth-sage text-white' : 'border-earth-sand'}`}>
                    {actions.includes(action) && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={actions.includes(action)}
                    onChange={(e) => {
                      if (e.target.checked) setActions([...actions, action]);
                      else setActions(actions.filter(a => a !== action));
                    }}
                  />
                  <span className={`text-lg transition-colors ${actions.includes(action) ? 'text-earth-sage font-bold' : 'text-earth-charcoal/70'}`}>{action}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={actions.length === 0}
              className="w-full py-5 bg-earth-charcoal text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finish Session
            </button>
          </motion.div>
        );
      case 7:
        return (
          <motion.div key="step7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 py-12 text-center">
            <div className="w-20 h-20 bg-earth-terracotta/10 text-earth-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 fill-earth-terracotta" />
            </div>

            <div className="space-y-4 max-w-lg mx-auto">
              <h2 className="text-4xl font-serif font-bold text-earth-charcoal">You did it.</h2>
              <p className="text-xl text-earth-charcoal/70 leading-relaxed font-sans">
                You took a moment for yourself today. That's a huge victory. You are resilient, even when it doesn't feel like it.
              </p>
            </div>

            {actions.length > 0 && (
              <div className="bg-white p-8 rounded-[2.5rem] border border-earth-sand/20 shadow-sm text-left max-w-md mx-auto space-y-4">
                <h3 className="font-serif text-2xl text-earth-sage">{t.crisis.planTitle}:</h3>
                <ul className="space-y-3">
                  {actions.map((a, i) => (
                    <li key={i} className="flex gap-3 text-earth-charcoal/80 bg-earth-cream/50 p-3 rounded-xl border border-earth-sand/10">
                      <div className="w-5 h-5 rounded-full bg-earth-sage/20 text-earth-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 max-w-sm mx-auto pt-8">
              <Link to="/community" className="w-full py-4 bg-white border-2 border-earth-sage text-earth-sage rounded-2xl font-bold hover:bg-earth-sage/5 transition-all">
                {t.nav.community}
              </Link>
              <Link to="/navigator" className="w-full py-4 bg-white border-2 border-earth-sage text-earth-sage rounded-2xl font-bold hover:bg-earth-sage/5 transition-all">
                {t.nav.navigator}
              </Link>
              <Link to="/" className="w-full py-4 bg-earth-sage text-white rounded-2xl font-bold hover:shadow-lg transition-all">
                Finish
              </Link>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}

function GroundingItem({ number, icon, label, examples }: any) {
  const [complete, setComplete] = useState(false);
  return (
    <button
      onClick={() => setComplete(!complete)}
      className={`w-full p-6 text-left rounded-[2rem] border-2 transition-all flex items-center gap-6 ${complete ? 'bg-earth-sage border-earth-sage text-white shadow-lg' : 'bg-white border-earth-cream text-earth-charcoal hover:border-earth-sand'}`}
    >
      <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-serif text-2xl font-bold ${complete ? 'bg-white/20' : 'bg-earth-cream text-earth-sand'}`}>
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="font-bold text-lg">{label}</span>
        </div>
        <p className={`text-sm ${complete ? 'text-white/80' : 'text-earth-charcoal/60'}`}>Ex: {examples}</p>
      </div>
      {complete && <CheckCircle2 className="w-6 h-6 text-white" />}
    </button>
  );
}
