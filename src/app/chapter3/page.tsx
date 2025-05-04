// import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper components (assuming they are defined globally or imported)
const Latex = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>{children}</span>
);
const IntuitionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px solid #555', backgroundColor: '#f0f0f0', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
    <h3 style={{ marginTop: '0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>{title}</h3>
    {children}
  </div>
);
const DefinitionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px solid #777', backgroundColor: '#fafafa', padding: '15px', margin: '20px 0', borderRadius: '3px' }}>
    <h4 style={{ marginTop: '0', color: '#333' }}>{title}</h4>
    {children}
  </div>
);
const ExampleBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px dashed #888', backgroundColor: '#fff', padding: '15px', margin: '20px 0', borderRadius: '3px' }}>
    <h4 style={{ marginTop: '0', fontStyle: 'italic' }}>{title}</h4>
    {children}
  </div>
);
const RemarkBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ borderLeft: '3px solid #aaa', backgroundColor: '#f9f9f9', padding: '10px 15px', margin: '20px 0' }}>
    <strong>Remark:</strong> {children}
  </div>
);
const CodeBlock = ({ language, children }: { language: string; children: string }) => (
  <SyntaxHighlighter language={language} style={atomDark} customStyle={{ borderRadius: '5px', padding: '15px', margin: '15px 0' }}>
    {children}
  </SyntaxHighlighter>
);

export default function Chapter3Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="max-w-5xl w-full font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Chapter 3: Counting Processes and Diffusion</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Introduction: Modeling Arrivals and Continuous Change</h2>
          <p className="mb-4">
            In the previous chapter, we explored discrete-time processes where the system jumps between states at specific time steps. Now, we shift our focus to processes that evolve in continuous time, particularly those related to counting events and modeling continuous random movement.
          </p>
          <p className="mb-4">
            How can we model the arrival of customers at a store, the occurrence of earthquakes, or the decay of radioactive particles over time? These phenomena involve counting discrete events occurring randomly in a continuous time interval. The <strong>Poisson process</strong> provides a fundamental and widely applicable model for such scenarios.
          </p>
          <p className="mb-4">
            We will begin by deriving the Poisson process from first principles, starting with the idea of counting events in small intervals using the Binomial distribution and taking a limit. We will explore its key properties, including the Poisson distribution for the number of events in a fixed interval and the Exponential distribution for the time between events. We will also discuss variations and extensions, such as non-homogeneous Poisson processes where the rate of events changes over time.
          </p>
          <p className="mb-4">
            Building on the idea of counting arrivals and departures, we introduce <strong>birth-death processes</strong>, a class of continuous-time Markov chains where the state represents a population size that changes by single increments (births) or decrements (deaths). These processes are essential for modeling queues, population dynamics, and chemical reactions.
          </p>
          <p className="mb-4">
            Finally, we transition from discrete counts to continuous movement by introducing <strong>diffusion processes</strong>. These processes model the random motion of particles, often described by stochastic differential equations. We will focus on <strong>Brownian motion</strong> (also known as the Wiener process), the canonical example of a diffusion process, which arises as the limit of random walks and is fundamental in physics, finance, and many other fields. We will explore its properties, such as continuous paths, independent increments, and its connection to the heat equation.
          </p>
          <p className="mb-4">
            This chapter bridges the gap between discrete event counting and continuous random evolution, providing tools to model a vast range of dynamic phenomena.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Poisson Process: Counting Random Events</h2>
          <p className="mb-4">
            Imagine events occurring randomly over time, such as customers arriving at a service counter, emails arriving in an inbox, or goals being scored in a football match. The Poisson process is a simple yet powerful model for the number of such events occurring up to a certain time.
          </p>
          <p className="mb-4">
            Let <Latex>N(t)</Latex> denote the number of events that have occurred in the time interval <Latex>[0, t]</Latex>. We define the Poisson process based on a few key assumptions about how these events occur.
          </p>

          <h3 className="text-xl font-semibold mb-3">Derivation from Binomial</h3>
          <p className="mb-4">
            Consider a long time interval <Latex>[0, t]</Latex>. Divide this interval into <Latex>n</Latex> very small subintervals of length <Latex>&Delta;t = t/n</Latex>. Assume <Latex>n</Latex> is large enough so that <Latex>&Delta;t</Latex> is very small.
          </p>
          <p className="mb-4">Make the following assumptions for each small subinterval <Latex>(s, s+&Delta;t]</Latex>:</p>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li>The probability of exactly one event occurring is approximately proportional to the length of the interval: <Latex>P(1 event) &asymp; &lambda; &Delta;t</Latex>, where <Latex>&lambda; &gt; 0</Latex> is the constant average rate of events.</li>
            <li>The probability of more than one event occurring is negligible: <Latex>P(&ge; 2 events) &asymp; 0</Latex> (more formally, it is <Latex>o(&Delta;t)</Latex>).</li>
            <li>The occurrence of events in disjoint intervals are independent.</li>
          </ol>
          <p className="mb-4">
            Under these assumptions, <Latex>N(t)</Latex> can be thought of as the number of "successes" in <Latex>n</Latex> independent Bernoulli trials, with success probability <Latex>p = &lambda; &Delta;t = &lambda; t / n</Latex>. Thus, <Latex>N(t)</Latex> follows a Binomial distribution <Latex>B(n, p)</Latex>.
          </p>
          <p className="mb-4">
            In the limit as <Latex>n &rarr; &infin;</Latex> (so <Latex>&Delta;t &rarr; 0</Latex>), the Binomial distribution <Latex>B(n, p)</Latex> converges to the Poisson distribution with parameter <Latex>&mu; = np = &lambda; t</Latex>.
          </p>
          <p className="text-center my-3"><Latex>lim<sub>n&rarr;&infin;</sub> P(N(t) = k) = [(&lambda; t)<sup>k</sup> / k!] e<sup>-&lambda;t</sup></Latex></p>

          <h3 className="text-xl font-semibold mb-3">Formal Definition and Properties</h3>
          <DefinitionBox title="Definition: Poisson Process">
            A counting process <Latex>N(t), t &ge; 0</Latex> is a <strong>Poisson process</strong> with rate <Latex>&lambda; &gt; 0</Latex> if:
            <ol className="list-decimal list-inside space-y-1">
              <li><Latex>N(0) = 0</Latex>.</li>
              <li>It has <strong>independent increments</strong>: Events in non-overlapping intervals are independent.</li>
              <li>The number of events in any interval of length <Latex>s</Latex> follows a Poisson distribution with mean <Latex>&lambda; s</Latex>: <Latex>P(N(t<sub>2</sub>) - N(t<sub>1</sub>) = k) = [e<sup>-&lambda;s</sup> (&lambda; s)<sup>k</sup>] / k!</Latex> (<strong>stationary increments</strong>).</li>
            </ol>
          </DefinitionBox>
          <IntuitionBox title="Intuition: Memoryless Arrivals">
            The independent and stationary increments properties capture the idea of "memoryless" arrivals. The future is independent of the past given the present, and the arrival rate is constant.
          </IntuitionBox>
          <p className="mb-4">Key Properties:</p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><Latex>E[N(t)] = &lambda; t</Latex></li>
            <li><Latex>Var(N(t)) = &lambda; t</Latex></li>
            <li><strong>Superposition:</strong> Sum of independent Poisson processes with rates <Latex>&lambda;<sub>1</sub>, &lambda;<sub>2</sub></Latex> is Poisson with rate <Latex>&lambda;<sub>1</sub> + &lambda;<sub>2</sub></Latex>.</li>
            <li><strong>Thinning:</strong> Splitting a Poisson process with rate <Latex>&lambda;</Latex> based on probability <Latex>p</Latex> yields two independent Poisson processes with rates <Latex>&lambda; p</Latex> and <Latex>&lambda; (1-p)</Latex>.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Interarrival Times</h3>
          <p className="mb-4">
            Let <Latex>W<sub>i</sub></Latex> be the time between the <Latex>(i-1)</Latex>-th and <Latex>i</Latex>-th event.
          </p>
          <DefinitionBox title="Proposition: Interarrival Times Distribution">
            For a Poisson process with rate <Latex>&lambda;</Latex>, the interarrival times <Latex>W<sub>1</sub>, W<sub>2</sub>, ...</Latex> are independent and identically distributed (i.i.d.) random variables, each following an <strong>Exponential distribution</strong> with parameter <Latex>&lambda;</Latex> (mean <Latex>1/&lambda;</Latex>).
            <p className="text-center my-3"><Latex>f<sub>W</sub>(w) = &lambda; e<sup>-&lambda;w</sup>, w &ge; 0</Latex></p>
          </DefinitionBox>
          <RemarkBox>
            The Poisson process derivation via Binomial limit mirrors the relationship between Bernoulli trials (Geometric waiting times) and the continuous-time Poisson process (Exponential waiting times).
          </RemarkBox>
          <ExampleBox title="Example: Customer Arrivals">
            Customers arrive via Poisson process, rate <Latex>&lambda; = 10</Latex> customers/hour.
            <ol className="list-decimal list-inside space-y-1">
              <li>Prob. exactly 5 customers in 30 mins (<Latex>t=0.5</Latex>)? Mean <Latex>&mu; = &lambda; t = 5</Latex>. <Latex>P(N(0.5) = 5) = [e<sup>-5</sup> 5<sup>5</sup>] / 5! &asymp; 0.175</Latex>.</li>
              <li>Expected time until next customer? <Latex>E[W] = 1/&lambda; = 1/10</Latex> hour = 6 minutes.</li>
              <li>Prob. time until next customer &gt; 15 mins (<Latex>t=0.25</Latex>)? <Latex>P(W &gt; 0.25) = e<sup>-&lambda;t</sup> = e<sup>-10*0.25</sup> = e<sup>-2.5</sup> &asymp; 0.082</Latex>.</li>
            </ol>
          </ExampleBox>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Birth-Death Processes: Continuous-Time Markov Chains</h2>
          <p className="mb-4">
            Birth-death processes model populations where individuals are "born" or "die" continuously over time. State <Latex>X(t)</Latex> is the population size.
          </p>
          <p className="mb-4">Assumptions for state <Latex>n</Latex> in interval <Latex>(t, t+dt]</Latex>:</p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Transition only to <Latex>n+1</Latex> (birth) or <Latex>n-1</Latex> (death).</li>
            <li>Prob. of birth <Latex>&asymp; &lambda;<sub>n</sub> dt</Latex> (birth rate <Latex>&lambda;<sub>n</sub></Latex>).</li>
            <li>Prob. of death <Latex>&asymp; &mu;<sub>n</sub> dt</Latex> (death rate <Latex>&mu;<sub>n</sub></Latex>, with <Latex>&mu;<sub>0</sub> = 0</Latex>).</li>
            <li>Prob. of &gt;1 event is negligible (<Latex>o(dt)</Latex>).</li>
            <li>Births and deaths are independent.</li>
          </ul>
          <IntuitionBox title="Connection to Poisson Process">
            The Poisson process is a special case: a pure birth process with constant birth rate <Latex>&lambda;<sub>n</sub> = &lambda;</Latex> and zero death rate <Latex>&mu;<sub>n</sub> = 0</Latex>.
          </IntuitionBox>
          {/* Further details on solving for probabilities, stationary distributions etc. omitted for web brevity */}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Diffusion Processes and Brownian Motion</h2>
          <p className="mb-4">
            Diffusion processes model continuous random movement, like particles in a fluid or stock prices.
          </p>

          <h3 className="text-xl font-semibold mb-3">Brownian Motion (Wiener Process)</h3>
          <p className="mb-4">
            Brownian motion describes the random path of a particle subject to continuous random collisions.
          </p>
          <DefinitionBox title="Definition: Standard Brownian Motion">
            A stochastic process <Latex>B(t), t &ge; 0</Latex> is a <strong>standard Brownian motion</strong> (or Wiener process) if:
            <ol className="list-decimal list-inside space-y-1">
              <li><Latex>B(0) = 0</Latex>.</li>
              <li>It has <strong>independent increments</strong>.</li>
              <li>The increment <Latex>B(t) - B(s)</Latex> for <Latex>0 &le; s &lt; t</Latex> follows a <strong>Normal distribution</strong> <Latex>N(0, t-s)</Latex> (<strong>stationary increments</strong>).</li>
              <li>Sample paths <Latex>t &rarr; B(t)</Latex> are continuous almost surely.</li>
            </ol>
          </DefinitionBox>
          <IntuitionBox title="Intuition: Limit of Random Walks">
            Brownian motion can be seen as the scaling limit of a simple symmetric random walk where step sizes and time steps go to zero appropriately. The Central Limit Theorem explains the emergence of the Normal distribution for increments.
          </IntuitionBox>
          <p className="mb-4">Key Properties:</p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><Latex>B(t) &sim; N(0, t)</Latex>.</li>
            <li><Latex>E[B(t)] = 0</Latex>.</li>
            <li>Covariance: <Latex>Cov(B(s), B(t)) = min(s, t)</Latex>.</li>
            <li>Paths are continuous but nowhere differentiable.</li>
            <li>Quadratic Variation: <Latex>[B, B]<sub>t</sub> = t</Latex> (informally, <Latex>(dB)<sup>2</sup> = dt</Latex>).</li>
          </ul>
          <div className="text-center my-4 p-4 border bg-gray-100">
            [Figure 3.1: Sample Paths of Brownian Motion - Placeholder, e.g., brownian_motion_paths.png]
          </div>
          {/* Code for simulating Brownian motion could be added here */}
          <CodeBlock language="python">
{`import numpy as np
import matplotlib.pyplot as plt

def brownian_motion(T, N):
    """Simulates standard Brownian motion.
    T: Total time.
    N: Number of time steps.
    """
    dt = T / N
    # Increments are sqrt(dt) * N(0,1)
    dB = np.sqrt(dt) * np.random.randn(N)
    # Path B(t) = cumulative sum of increments
    B = np.cumsum(dB)
    # Add B(0) = 0
    B = np.insert(B, 0, 0)
    t = np.linspace(0, T, N + 1)
    return t, B

# Example usage:
T = 1.0
N = 500
t, B = brownian_motion(T, N)

# plt.figure(figsize=(10, 5))
# plt.plot(t, B, color='gray')
# plt.title('Standard Brownian Motion Path')
# plt.xlabel('Time t')
# plt.ylabel('B(t)')
# plt.grid(True, linestyle='--', alpha=0.6)
# plt.savefig('brownian_motion_path_gray.png') # Need to save plot
# plt.close()
`}
          </CodeBlock>
        </section>

      </div>
    </main>
  );
}

