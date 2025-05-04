import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Simple component to render LaTeX-like math as inline text
const Latex = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>{children}</span>
);

// Simple component for styled intuition boxes (grayscale)
const IntuitionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px solid #555', backgroundColor: '#f0f0f0', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
    <h3 style={{ marginTop: '0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>{title}</h3>
    {children}
  </div>
);

// Simple component for styled definition boxes (grayscale)
const DefinitionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px solid #777', backgroundColor: '#fafafa', padding: '15px', margin: '20px 0', borderRadius: '3px' }}>
    <h4 style={{ marginTop: '0', color: '#333' }}>{title}</h4>
    {children}
  </div>
);

// Simple component for styled example boxes (grayscale)
const ExampleBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ border: '1px dashed #888', backgroundColor: '#fff', padding: '15px', margin: '20px 0', borderRadius: '3px' }}>
    <h4 style={{ marginTop: '0', fontStyle: 'italic' }}>{title}</h4>
    {children}
  </div>
);

// Simple component for styled remark boxes (grayscale)
const RemarkBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ borderLeft: '3px solid #aaa', backgroundColor: '#f9f9f9', padding: '10px 15px', margin: '20px 0' }}>
    <strong>Remark:</strong> {children}
  </div>
);

// Component for code blocks
const CodeBlock = ({ language, children }: { language: string; children: string }) => (
  <SyntaxHighlighter language={language} style={atomDark} customStyle={{ borderRadius: '5px', padding: '15px', margin: '15px 0' }}>
    {children}
  </SyntaxHighlighter>
);

export default function Chapter1Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="max-w-5xl w-full font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Chapter 1: Randomness: Modeling Uncertainty</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Introduction: Embracing Uncertainty</h2>
          <p className="mb-4">
            Will it rain tomorrow? Where should I invest my capital? How will new technologies emerge? Our world is filled with questions whose answers are uncertain. From forecasting weather patterns and predicting stock market movements to understanding the spread of diseases and the emergence of innovations, unpredictability is a fundamental aspect of reality. It challenges our ability to plan, decide, and comprehend the systems around us.
          </p>
          <p className="mb-4">
            To navigate this inherent uncertainty, we turn to the mathematical framework of probability and statistics. At the heart of this framework lies the concept of <strong>randomness</strong>. We use tools like random numbers, random variables, and stochastic processes to model systems that exhibit unpredictable behavior. These tools allow us to quantify uncertainty, analyze complex phenomena, and make informed decisions even when outcomes are not predetermined.
          </p>
          <p className="mb-4">
            This chapter introduces the foundational concepts of randomness. We begin by exploring how we can generate and characterize randomness, particularly using computational methods. We then build a formal structure for probability using measures and sample spaces. With this foundation, we introduce random variables – functions that map random outcomes to numerical values – and explore their distributions through Probability Mass Functions (PMFs) for discrete variables and Probability Density Functions (PDFs) for continuous ones. We will examine key distributions like the Bernoulli, Binomial, Poisson, Uniform, Exponential, and the ubiquitous Normal distribution. We will also introduce the Cumulative Distribution Function (CDF) as a unified way to describe distributions.
          </p>
          <p className="mb-4">
            Furthermore, we will learn how to summarize the key features of random variables using measures like expectation (mean) and variance. Finally, we delve into two cornerstone theorems of probability – the Law of Large Numbers (LLN) and the Central Limit Theorem (CLT) – which describe the behavior of averages of random variables in the long run. We conclude by illustrating the practical power of these concepts through Monte Carlo methods, a class of computational algorithms that rely on repeated random sampling to obtain numerical results, particularly for complex integration problems.
          </p>
          <p className="mb-4">
            By understanding the fundamentals laid out in this chapter, we gain the ability to model, simulate, and reason about processes governed by chance, providing insights into phenomena ranging from the microscopic fluctuations in physical systems to the large-scale dynamics of economies and societies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Generating Randomness</h2>
          <p className="mb-4">
            How can we capture the essence of unpredictability? A key starting point is the concept of a random number.
          </p>
          <DefinitionBox title="Definition: Random Number">
            A <strong>random number</strong> is a value selected from a given set (the sample space) such that each number in the set has a specified, often equal, chance of being selected. Crucially, the selection process should ensure that the value is unpredictable and independent of preceding or succeeding selections, lacking any discernible pattern or regularity.
          </DefinitionBox>
          <p className="mb-4">
            In an increasingly digital world, generating true randomness computationally presents a paradox. Computers are fundamentally deterministic machines; they execute instructions precisely as given, leading to predictable outputs. How, then, can a computer produce a sequence of numbers that mimics the unpredictability inherent in physical processes like flipping a coin or rolling a die?
          </p>

          <h3 className="text-xl font-semibold mb-3">Pseudo-Random Number Generators (PRNGs)</h3>
          <p className="mb-4">
            The solution lies in algorithms known as <strong>Pseudo-Random Number Generators (PRNGs)</strong>. These algorithms don't produce truly random numbers but rather generate sequences that <em>appear</em> random and pass various statistical tests for randomness. They start with an initial value called a <strong>seed</strong>, and through a deterministic process, produce a long sequence of numbers.
          </p>
          <IntuitionBox title="Intuition: Deterministic Randomness?">
            It might seem contradictory to call a deterministic sequence "random." However, the key is that while the sequence is predictable <em>if you know the algorithm and the seed</em>, it appears unpredictable to an observer who doesn't have this information. A good PRNG produces sequences where successive numbers are practically uncorrelated and uniformly distributed over their range. This "pseudo-randomness" is often sufficient and even desirable for simulations, modeling, and cryptography, as it allows for reproducibility.
          </IntuitionBox>
          <p className="mb-4">A well-designed PRNG typically satisfies several desirable properties:</p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Uniformity:</strong> The numbers produced should be uniformly distributed across the possible range.</li>
            <li><strong>Independence:</strong> Each number generated should be statistically independent of the others.</li>
            <li><strong>Long Period:</strong> The sequence should have an extremely long period before repeating.</li>
            <li><strong>Reproducibility:</strong> Given the same seed, a PRNG must always produce the exact same sequence.</li>
            <li><strong>Efficiency:</strong> The algorithm should be computationally fast and require minimal memory.</li>
            <li><strong>Unpredictability (Optional):</strong> For cryptographic applications, predicting the next number should be computationally infeasible.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Linear Congruential Generators (LCGs)</h3>
          <p className="mb-4">
            One of the oldest and simplest types of PRNGs is the <strong>Linear Congruential Generator (LCG)</strong>.
          </p>
          <DefinitionBox title="Definition: Linear Congruential Generator (LCG)">
            An LCG generates a sequence of pseudo-random integers <Latex>X_0, X_1, X_2, ...</Latex> using the linear recurrence relation:
            <p className="text-center my-3"><Latex>X_{'{n+1}'} = (a X_n + c) mod m</Latex></p>
            where:
            <ul className="list-disc list-inside space-y-1">
              <li><Latex>X_n</Latex> is the <Latex>n</Latex>-th number in the sequence.</li>
              <li><Latex>X_0</Latex> is the initial <strong>seed</strong>.</li>
              <li><Latex>m &gt; 0</Latex> is the <strong>modulus</strong> (range is <Latex>{'{0, 1, ..., m-1}'}</Latex>).</li>
              <li><Latex>a</Latex> is the <strong>multiplier</strong> (<Latex>0 {'<='} a {'<'} m</Latex>).</li>
              <li><Latex>c</Latex> is the <strong>increment</strong> (<Latex>0 {'<='} c {'<'} m</Latex>).</li>
            </ul>
            The choice of <Latex>m, a, c</Latex>, and <Latex>X_0</Latex> significantly impacts the quality.
          </DefinitionBox>
          <ExampleBox title="Example: A Simple LCG">
            Consider an LCG with parameters <Latex>m=8, a=3, c=1</Latex>, and seed <Latex>X_0 = 5</Latex>. The recurrence is <Latex>X_{'{n+1}'} = (3 X_n + 1)  mod 8</Latex>.
            <ul className="list-disc list-inside space-y-1">
              <li><Latex>X_1 = (3 * 5 + 1)  mod 8 = 16  mod 8 = 0</Latex></li>
              <li><Latex>X_2 = (3 * 0 + 1)  mod 8 = 1  mod 8 = 1</Latex></li>
              <li><Latex>X_3 = (3 * 1 + 1)  mod 8 = 4  mod 8 = 4</Latex></li>
              <li><Latex>X_4 = (3 * 4 + 1)  mod 8 = 13  mod 8 = 5</Latex></li>
              <li><Latex>X_5 = (3 * 5 + 1)  mod 8 = 16  mod 8 = 0</Latex> ... The sequence repeats!</li>
            </ul>
            The sequence generated is <Latex>5, 0, 1, 4, 5, 0, 1, 4, ...</Latex>. This LCG has a period of only 4.
            {/* Placeholder for TikZ Figure 1.1 - Needs conversion or recreation */}
            <div className="text-center my-4 p-4 border bg-gray-100">
              [Figure 1.1: LCG Sequence Plot - Placeholder]
            </div>
          </ExampleBox>
          <RemarkBox>
            The quality of an LCG depends heavily on the choice of <Latex>a, c, m</Latex>. Poor choices can lead to short periods or correlations. Specific conditions exist for choosing parameters that guarantee the maximum possible period length (<Latex>m</Latex> when <Latex>c != 0</Latex>). Many standard libraries use carefully chosen parameters.
          </RemarkBox>

          <h3 className="text-xl font-semibold mb-3">Normalization and Mapping</h3>
          <p className="mb-4">
            Often, we need random numbers uniformly distributed in the continuous interval <Latex>[0, 1)</Latex>. We can achieve this by normalizing the output of an LCG:
            <p className="text-center my-3"><Latex>U_n = X_n / m</Latex></p>
            Since <Latex>X_n</Latex> is in <Latex>{'{0, 1, ..., m-1}'}</Latex>, <Latex>U_n</Latex> will be in <Latex>{'{0, 1/m, ..., (m-1)/m}'}</Latex>, approximating <Latex>[0, 1)</Latex> for large <Latex>m</Latex>.
            {/* Placeholder for TikZ Figure 1.2 - Needs conversion or recreation */}
            <div className="text-center my-4 p-4 border bg-gray-100">
              [Figure 1.2: RNG Normalization Plot - Placeholder]
            </div>
          </p>
          <p className="mb-4">
            Once we have pseudo-random numbers in <Latex>[0, 1)</Latex>, we can generate outcomes for various experiments.
          </p>
          <ExampleBox title="Example: Simulating a Fair Coin Toss">
            Generate <Latex>U_n</Latex> uniformly in <Latex>[0, 1)</Latex>. Mapping Rule: If <Latex>U_n {'<'} 0.5</Latex>, output H. If <Latex>U_n {'>='} 0.5</Latex>, output T. Since <Latex>U_n</Latex> is uniform, <Latex>P(U_n {'<'} 0.5) = 0.5</Latex> and <Latex>P(U_n {'>='} 0.5) = 0.5</Latex>.
            Using the LCG <Latex>X_n = 5, 0, 1, 4, ...</Latex> with <Latex>m=8</Latex>, the normalized sequence <Latex>U_n</Latex> is <Latex>0.625, 0, 0.125, 0.5, ...</Latex>.
            Applying the rule: T, H, H, T, ...
            <div className="text-center my-4">
              <Image src="/images/01experiment1.png" alt="Coin Toss Convergence" width={500} height={300} className="mx-auto"/>
              <p className="text-xs text-gray-600">Figure 1.3: Convergence of Heads frequency to 0.5.</p>
            </div>
          </ExampleBox>
          <ExampleBox title="Example: Simulating a Fair Six-Sided Die">
            Generate <Latex>U_n</Latex> uniformly in <Latex>[0, 1)</Latex>. Mapping Rule: Calculate <Latex>X =  floor(6 U_n) + 1</Latex>.
            If <Latex>U_n = 0.71</Latex>, then <Latex>6 U_n = 4.26</Latex>, so <Latex> floor(6 U_n) = 4</Latex>, outcome is <Latex>4+1=5</Latex>.
          </ExampleBox>
          {/* Exercise and Solution for Die Roll - omitted for brevity in this draft */}
        </section>

        {/* Sections 2-7 and Exercises would follow a similar structure */}
        {/* Placeholder for remaining sections */} 
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Language of Probability: Sample Spaces and Events</h2>
          {/* Content for Section 2 */} 
          <p>...</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Random Variables and Distributions</h2>
          {/* Content for Section 3 */} 
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/01binomialpmf.png" alt="Binomial PMF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure: Binomial PMF.</p>
          </div>
          <div className="text-center my-4">
            <Image src="/images/01poissonpmf.png" alt="Poisson PMF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure: Poisson PMF.</p>
          </div>
           <div className="text-center my-4">
            <Image src="/images/01geometricpmf.png" alt="Geometric PMF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure: Geometric PMF.</p>
          </div>
          <div className="text-center my-4">
            <Image src="/images/01normalpdf.png" alt="Normal PDF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure: Normal PDF.</p>
          </div>
          <div className="text-center my-4">
            <Image src="/images/01exponentialpdf.png" alt="Exponential PDF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure: Exponential PDF.</p>
          </div>
          <div className="text-center my-4">
            <Image src="/images/01bernoulli_cdf_plot.png" alt="Bernoulli CDF" width={400} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 1.4: Bernoulli CDF.</p>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Summarizing Distributions: Expectation and Variance</h2>
          {/* Content for Section 4 */} 
          <p>...</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Limit Theorems: LLN and CLT</h2>
          {/* Content for Section 5 */} 
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/01LLM.png" alt="Law of Large Numbers" width={500} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 1.5: Law of Large Numbers Illustration.</p>
          </div>
          <div className="text-center my-4">
            <Image src="/images/01CLT.png" alt="Central Limit Theorem" width={500} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 1.6: Central Limit Theorem Illustration.</p>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Application: Monte Carlo Methods</h2>
          {/* Content for Section 6 */} 
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/montecarlo1.png" alt="Monte Carlo Pi Estimation" width={400} height={400} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 1.7: Monte Carlo Pi Estimation.</p>
          </div>
          <CodeBlock language="python">
{`import numpy as np
N = 10000
# Generate N random points (x, y) in [-1, 1] x [-1, 1]
x = np.random.uniform(-1, 1, N)
y = np.random.uniform(-1, 1, N)
# Check if points are inside the unit circle (x^2 + y^2 <= 1)
inside = (x**2 + y**2) <= 1
# Count points inside
N_inside = np.sum(inside)
# Estimate pi
pi_hat = 4 * N_inside / N
print(f"Estimate for pi (N={N}): {pi_hat:.5f}")`}
          </CodeBlock>
          <div className="text-center my-4">
            <Image src="/images/montecarlo2.png" alt="Monte Carlo Integration x^2" width={500} height={350} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 1.8: Monte Carlo Integration of x^2.</p>
          </div>
           <CodeBlock language="python">
{`import numpy as np
N = 10000
# Generate N random numbers uniformly from [0, 1]
X = np.random.rand(N)
# Calculate g(X_i) = X_i^2
gX = X**2
# Calculate the estimate
I_hat = np.mean(gX) 
print(f"Estimate for N={N}: {I_hat:.4f}")
# Output might be: Estimate for N=10000: 0.3328`}
          </CodeBlock>
        </section>

      </div>
    </main>
  );
}

