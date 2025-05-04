import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper components (assuming they are defined globally or imported, copying from Ch1 for now)
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

export default function Chapter2Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="max-w-5xl w-full font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Chapter 2: Interaction, Dependence, and Processes</h1>

        {/* Placeholder for Abstract TikZ Diagram */}
        <div className="text-center my-4 p-4 border bg-gray-100">
          [Figure 2.1: Abstract Network Diagram - Placeholder]
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Introduction: When Variables Interact and Evolve</h2>
          <p className="mb-4">
            In the previous chapter, we explored the fundamentals of randomness by focusing on individual random variables and their distributions. However, real-world phenomena rarely involve isolated variables. More often, we encounter systems where multiple random factors interact, influence each other, exhibit complex dependencies, and evolve over time. Understanding these interactions and dynamics is crucial for modeling realistic systems.
          </p>
          <p className="mb-4">
            How does knowing the outcome of one event change our prediction about another? If two variables tend to move together, how can we quantify this relationship? What large-scale structures emerge when simple components interact randomly? How can we model systems that change state probabilistically over time, where the future depends only on the present?
          </p>
          <p className="mb-4">
            This chapter delves into the concepts of dependence, conditional probability, the structure of random networks, and the dynamics of Markov chains.
          </p>
          <p className="mb-4">
            We begin by defining statistical independence and dependence, exploring how the relationship (or lack thereof) between random variables affects their joint behavior. We then introduce <strong>conditional probability</strong>, a cornerstone concept that allows us to update our beliefs about an event given information about another. This leads naturally to <strong>Bayes' Theorem</strong>, a powerful tool for reversing conditional probabilities and updating beliefs in light of new evidence, which is fundamental to fields like machine learning and statistical inference.
          </p>
          <p className="mb-4">
            Next, we extend our view from pairs of variables to systems of interacting components by introducing <strong>random networks</strong> (or graphs). We will explore basic graph concepts and introduce fundamental models like the Erdős-Rényi, Watts-Strogatz, and Barabási-Albert models, which capture different ways networks can form and exhibit properties like small-world effects and scale-free degree distributions.
          </p>
          <p className="mb-4">
            Finally, we introduce <strong>Markov chains</strong>, a fundamental class of stochastic processes used to model systems that evolve probabilistically over time. We will explore the defining <strong>Markov property</strong> (memorylessness), transition matrices, state classification, and the concept of a <strong>stationary distribution</strong>, which describes the long-run behavior of these processes.
          </p>
          <p className="mb-4">
            By exploring these concepts, we move beyond the study of isolated randomness to understand the richer, interconnected, and dynamic nature of probabilistic systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dependence and Independence</h2>
          <p className="mb-4">
            When studying multiple random variables, a fundamental question is whether they influence each other. The concept of independence captures the idea that the outcome of one variable provides no information about the outcome of another.
          </p>
          <DefinitionBox title="Definition: Independence of Random Variables">
            Two random variables <Latex>X</Latex> and <Latex>Y</Latex> defined on the same probability space are <strong>independent</strong> if, for any (Borel) sets <Latex>A, B &sub; &real;</Latex>,
            <p className="text-center my-3"><Latex>P(X &isin; A and Y &isin; B) = P(X &isin; A) P(Y &isin; B)</Latex></p>
            Equivalently:
            <ul className="list-disc list-inside space-y-1">
              <li>For discrete variables: <Latex>f<sub>X,Y</sub>(x, y) = f<sub>X</sub>(x) f<sub>Y</sub>(y)</Latex> for all <Latex>x, y</Latex>.</li>
              <li>For continuous variables: <Latex>f<sub>X,Y</sub>(x, y) = f<sub>X</sub>(x) f<sub>Y</sub>(y)</Latex> for almost all <Latex>x, y</Latex>.</li>
            </ul>
            If the condition does not hold, the variables are <strong>dependent</strong>.
          </DefinitionBox>
          <IntuitionBox title="Intuition: Information and Factorization">
            Independence means that knowing the value of <Latex>X</Latex> doesn't change the probabilities associated with <Latex>Y</Latex>, and vice versa. The joint probability distribution simply factors into the product of the individual marginal distributions. Dependence implies some form of relationship or interaction where the value of one variable carries information about the other.
          </IntuitionBox>
          <ExampleBox title="Example: Rolling Two Dice">
            Let <Latex>X</Latex> be the outcome of the first die and <Latex>Y</Latex> the second. Assuming fair dice and independent rolls, <Latex>P({'(i, j)'}) = 1/36</Latex>. The marginals are <Latex>P(X=i) = 1/6</Latex> and <Latex>P(Y=j) = 1/6</Latex>. Since <Latex>1/36 = (1/6)(1/6)</Latex>, <Latex>X</Latex> and <Latex>Y</Latex> are independent.
            Now, consider <Latex>S = X+Y</Latex>. Are <Latex>S</Latex> and <Latex>X</Latex> independent? No. <Latex>P(S=2) = 1/36</Latex>, but <Latex>P(S=2 | X=1) = P(Y=1 | X=1) = 1/6</Latex>. Since <Latex>P(S=2 | X=1) &ne; P(S=2)</Latex>, they are dependent.
          </ExampleBox>
          <div className="text-center my-4">
            <Image src="/images/02_independence_dependence.png" alt="Independence vs Dependence" width={600} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 2.2: Joint distributions for two dice rolls (Independence vs. Dependence).</p>
          </div>
          <DefinitionBox title="Proposition: Expectation of Product">
            If <Latex>X</Latex> and <Latex>Y</Latex> are independent, then <Latex>E[XY] = E[X] E[Y]</Latex> (provided expectations exist).
          </DefinitionBox>
          <RemarkBox>
            The converse is not true. <Latex>E[XY] = E[X]E[Y]</Latex> only means variables are <strong>uncorrelated</strong> (measuring linear dependence). Independence implies uncorrelatedness, but not vice versa.
          </RemarkBox>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Conditional Probability: Updating Beliefs</h2>
          <p className="mb-4">
            How does new information affect probabilities? Conditional probability provides the framework.
          </p>
          <DefinitionBox title="Definition: Conditional Probability">
            Let <Latex>A</Latex> and <Latex>B</Latex> be events with <Latex>P(B) &gt; 0</Latex>. The <strong>conditional probability</strong> of <Latex>A</Latex> given <Latex>B</Latex> is:
            <p className="text-center my-3"><Latex>P(A | B) = P(A &cap; B) / P(B)</Latex></p>
            This is the probability of <Latex>A</Latex> within the reduced sample space <Latex>B</Latex>.
          </DefinitionBox>
          <IntuitionBox title="Intuition: Restricting the Sample Space">
            Knowing <Latex>B</Latex> occurred confines us to region <Latex>B</Latex>. The possible part of <Latex>A</Latex> is <Latex>A &cap; B</Latex>. We rescale the probability of <Latex>A &cap; B</Latex> by dividing by <Latex>P(B)</Latex> to get a valid probability within the new space <Latex>B</Latex>.
          </IntuitionBox>
          <DefinitionBox title="Definition: Conditional PMF and PDF">
            <ul className="list-disc list-inside space-y-1">
              <li>Discrete: <Latex>f<sub>X|Y</sub>(x|y) = P(X=x | Y=y) = f<sub>X,Y</sub>(x, y) / f<sub>Y</sub>(y)</Latex> (where <Latex>f<sub>Y</sub>(y) &gt; 0</Latex>).</li>
              <li>Continuous: <Latex>f<sub>X|Y</sub>(x|y) = f<sub>X,Y</sub>(x, y) / f<sub>Y</sub>(y)</Latex> (where <Latex>f<sub>Y</sub>(y) &gt; 0</Latex>).</li>
            </ul>
            For a fixed <Latex>y</Latex>, <Latex>f<sub>X|Y</sub>(x|y)</Latex> is a valid PMF/PDF in <Latex>x</Latex>.
          </DefinitionBox>
          <RemarkBox>
            If <Latex>X, Y</Latex> are independent, <Latex>f<sub>X|Y</sub>(x|y) = f<sub>X</sub>(x)</Latex>. Knowing <Latex>Y</Latex> doesn't change the distribution of <Latex>X</Latex>.
          </RemarkBox>

          <h3 className="text-xl font-semibold mb-3">The Multiplication Rule and Law of Total Probability</h3>
          <p className="mb-4">Rearranging gives the <strong>Multiplication Rule</strong>: <Latex>P(A &cap; B) = P(A | B) P(B)</Latex>.</p>
          <p className="mb-4">The <strong>Chain Rule</strong> extends this: <Latex>P(A<sub>1</sub> &cap; ... &cap; A<sub>n</sub>) = P(A<sub>1</sub>) P(A<sub>2</sub>|A<sub>1</sub>) ... P(A<sub>n</sub>|A<sub>1</sub> &cap; ... &cap; A<sub>n-1</sub>)</Latex>.</p>
          <p className="mb-4">The <strong>Law of Total Probability</strong>: If <Latex>B<sub>1</sub>, ..., B<sub>n</sub></Latex> partition <Latex>U</Latex>, then <Latex>P(A) = &sum;<sub>i</sub> P(A | B<sub>i</sub>) P(B<sub>i</sub>)</Latex>.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Bayes' Theorem: Reversing Conditional Probabilities</h2>
          <p className="mb-4">
            Often, we know <Latex>P(B|A)</Latex> but want <Latex>P(A|B)</Latex>. Bayes' Theorem provides the way.
          </p>
          <DefinitionBox title="Theorem: Bayes' Theorem">
            Let <Latex>A, B</Latex> be events with <Latex>P(A) &gt; 0, P(B) &gt; 0</Latex>. Then:
            <p className="text-center my-3"><Latex>P(A | B) = [P(B | A) P(A)] / P(B)</Latex></p>
            If <Latex>A<sub>1</sub>, ..., A<sub>n</sub></Latex> partition the sample space:
            <p className="text-center my-3"><Latex>P(A<sub>i</sub> | B) = [P(B | A<sub>i</sub>) P(A<sub>i</sub>)] / [&sum;<sub>j</sub> P(B | A<sub>j</sub>) P(A<sub>j</sub>)]</Latex></p>
          </DefinitionBox>
          <p className="mb-4">
            Terminology: <Latex>P(A<sub>i</sub>)</Latex> = Prior, <Latex>P(B | A<sub>i</sub>)</Latex> = Likelihood, <Latex>P(B)</Latex> = Evidence, <Latex>P(A<sub>i</sub> | B)</Latex> = Posterior.
          </p>
          <ExampleBox title="Example: Disease Testing Revisited">
            Prevalence <Latex>P(D=1) = 0.01</Latex>, Sensitivity <Latex>P(T=1|D=1) = 0.99</Latex>, Specificity <Latex>P(T=0|D=0) = 0.99</Latex> (<Latex>P(T=1|D=0) = 0.01</Latex>). Find <Latex>P(D=1|T=1)</Latex>.
            <p className="my-2"><Latex>P(D=1 | T=1) = [P(T=1 | D=1) P(D=1)] / [P(T=1 | D=1) P(D=1) + P(T=1 | D=0) P(D=0)]</Latex></p>
            <p className="my-2"><Latex>= [(0.99)(0.01)] / [(0.99)(0.01) + (0.01)(0.99)] = 0.0099 / 0.0198 = 0.5</Latex></p>
            Despite high test accuracy, low prevalence means a positive result only gives a 50% chance of disease.
            <div className="text-center my-4">
              <Image src="/images/02_bayes_disease_ppv.png" alt="Bayes Disease PPV" width={500} height={300} className="mx-auto"/>
              <p className="text-xs text-gray-600">Figure 2.3: Positive Predictive Value vs. Prevalence.</p>
            </div>
          </ExampleBox>
          {/* Example: Spam Classification - omitted for brevity */}
          {/* Exercise: Faulty Manufacturing - omitted for brevity */}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Random Networks: Modeling Connections</h2>
          {/* Content for Section 4 */} 
          <p>...</p>
          <DefinitionBox title="Definition: Graph">
            A graph <Latex>G = (V, E)</Latex> consists of a set of vertices <Latex>V</Latex> and a set of edges <Latex>E</Latex>, where each edge connects a pair of vertices.
          </DefinitionBox>
          <h3 className="text-xl font-semibold mb-3">Erdős-Rényi Model G(n, p)</h3>
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/02ERgraphs.png" alt="Erdos-Renyi Graphs" width={600} height={200} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 2.4: Erdős-Rényi graphs G(n, p) for n=50 and different p.</p>
          </div>
          <h3 className="text-xl font-semibold mb-3">Watts-Strogatz Model (Small World)</h3>
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/02_watts_strogatz.png" alt="Watts-Strogatz Graphs" width={600} height={200} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 2.5: Watts-Strogatz small-world graphs.</p>
          </div>
          <h3 className="text-xl font-semibold mb-3">Barabási-Albert Model (Scale-Free)</h3>
          <p>...</p>
          <div className="text-center my-4">
            <Image src="/images/02_barabasi_albert.png" alt="Barabasi-Albert Graph" width={600} height={300} className="mx-auto"/>
            <p className="text-xs text-gray-600">Figure 2.6: Barabási-Albert scale-free graph and degree distribution.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Markov Chains: Modeling Sequential Dependence</h2>
          {/* Content moved from old Chapter 3 */} 
          <p className="mb-4">
            Markov chains model systems that transition between states probabilistically over time, where the future state depends only on the current state (the Markov property).
          </p>
          <DefinitionBox title="Definition: Markov Chain">
            A sequence of random variables <Latex>X<sub>0</sub>, X<sub>1</sub>, X<sub>2</sub>, ...</Latex> taking values in a state space <Latex>S</Latex> is a <strong>Markov chain</strong> if it satisfies the <strong>Markov property</strong>:
            <p className="text-center my-3"><Latex>P(X<sub>n+1</sub> = j | X<sub>n</sub> = i, X<sub>n-1</sub> = i<sub>n-1</sub>, ..., X<sub>0</sub> = i<sub>0</sub>) = P(X<sub>n+1</sub> = j | X<sub>n</sub> = i)</Latex></p>
            for all states <Latex>i<sub>0</sub>, ..., i<sub>n-1</sub>, i, j</Latex> and all <Latex>n &ge; 0</Latex>. The probability <Latex>p<sub>ij</sub> = P(X<sub>n+1</sub> = j | X<sub>n</sub> = i)</Latex> is the <strong>transition probability</strong> from state <Latex>i</Latex> to state <Latex>j</Latex>.
          </DefinitionBox>
          <IntuitionBox title="Intuition: Memorylessness">
            The Markov property means the process is "memoryless" regarding its past history before the current state. The future evolution only depends on where it is now, not how it got there.
          </IntuitionBox>
          <ExampleBox title="Example: Market State Model">
            States: Bull (B), Bear (R), Stagnant (S). Transition probabilities given by a matrix P.
            <div className="text-center my-4">
              <Image src="/images/Ch3/market_state_diagram.png" alt="Market State Diagram" width={400} height={300} className="mx-auto"/>
              <p className="text-xs text-gray-600">Figure 2.7: Market State Transition Diagram.</p>
            </div>
          </ExampleBox>
          <ExampleBox title="Example: Random Walks">
            A particle moves on integers, stepping +1 or -1 with probabilities p and 1-p.
            <div className="flex justify-around my-4">
              <div className="text-center">
                <Image src="/images/Ch3/04random_walk_1d.png" alt="1D Random Walk" width={300} height={200} />
                <p className="text-xs text-gray-600">Figure 2.8: 1D Random Walk Path.</p>
              </div>
              <div className="text-center">
                <Image src="/images/Ch3/04random_walk_2d.png" alt="2D Random Walk" width={300} height={200} />
                <p className="text-xs text-gray-600">Figure 2.9: 2D Random Walk Path.</p>
              </div>
            </div>
            <CodeBlock language="python">
{`import numpy as np
import matplotlib.pyplot as plt

def random_walk_1d(steps):
    position = 0
    path = [0]
    for _ in range(steps):
        step = np.random.choice([-1, 1])
        position += step
        path.append(position)
    return path

# ... (plotting code similar to generate_chapter3_plots_grayscale.py)
`}
            </CodeBlock>
          </ExampleBox>
          <h3 className="text-xl font-semibold mb-3">State Classification and Stationary Distribution</h3>
          <p>...</p>
          <DefinitionBox title="Definition: Stationary Distribution">
            A probability distribution <Latex>&pi; = (&pi;<sub>1</sub>, &pi;<sub>2</sub>, ...)</Latex> over the state space is a <strong>stationary distribution</strong> if <Latex>&pi; P = &pi;</Latex> and <Latex>&sum;<sub>i</sub> &pi;<sub>i</sub> = 1</Latex>.
          </DefinitionBox>
          <ExampleBox title="Example: Infection Dynamics">
            States: Susceptible (S), Infected (I), Recovered (R).
            <div className="text-center my-4">
              <Image src="/images/Ch3/infection_dynamics_diagram.png" alt="Infection Dynamics Diagram" width={400} height={250} className="mx-auto"/>
              <p className="text-xs text-gray-600">Figure 2.10: Infection Dynamics State Diagram.</p>
            </div>
          </ExampleBox>
        </section>

      </div>
    </main>
  );
}

