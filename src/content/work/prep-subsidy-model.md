---
title: "Would a 100% subsidy of PrEP solve HIV in Australia?"
subtitle: "A modelling experiment"
summary: "A system dynamics model asking whether removing the cost of PrEP entirely would be enough — and what it reveals about which barriers actually bind."
year: 2021
type: model
source: UNSW
flood: blue
pdf: PrEP.pdf
featured: true
---

If PrEP prevents almost every HIV infection, and a lifetime of HIV treatment costs the Commonwealth around a million dollars per person, the economic case for subsidising it looks trivial. So I built a model to ask whether cost is actually the binding constraint.

It mostly isn't. And the more interesting finding was about what the model got *wrong*, and what that says about modelling people over long timescales.

## The problem

Human immunodeficiency virus (HIV) is a disease that we have no cure for as of yet. Without treatment, a person with HIV will eventually develop acquired immunodeficiency syndrome (AIDS), and again without treatment, they'll typically survive three years.

In the past, people with HIV and AIDS have been highly stigmatised in our society, with a lack of general understanding of how HIV is transmitted and treated. The demonisation of people who were infected with the disease stalled progress on treatment for many years. With lasting cultural touchstones such as the Australian Grim Reaper AIDS campaign (1987), there is a risk that the public's sense of the state of treatment could be stuck in the eighties, leaving a false perception about the state of treatment for people with HIV or AIDS.

Prevention is no longer the only cure we've got. A person infected with HIV in 2021 has a very different outlook than in 1987 — people with HIV can live long and healthy lives when taking the proper antiviral treatments (Ending HIV, 2021), with 97% of patients receiving treatment able to achieve what is called an undetectable viral load (AFAO 2021). What this means is that the viral load is so low it becomes all but undetectable, which means it is effectively untransmittable (U=U). Yet even with these advancements, there needs to be strict adherence to the treatment regimen to sustain a U=U status, alongside regular testing to confirm it.

On top of the significant personal reasons to prevent HIV infections, there are significant financial incentives. According to the AFAO, the total cost of treatment and care for a person with HIV is one million dollars over their lifetime (AFAO 2021). To use some crude math: if we could prevent one thousand infections through some intervention, we'd save the Commonwealth one billion dollars over the lifetime of those individuals.

So what is the best way to prevent HIV infections? The three best practical tools we have are physical protection — condoms — and chemical protection like pre-exposure prophylaxis (PrEP) and post-exposure prophylaxis (PEP). As well as behavioural choices like reducing the number of sexual partners sustained at a time and conducting regular STI testing. On top of these tools is the need to educate people on the use and effectiveness of each approach and how they work together.

## The question

**Will increasing the subsidy of PrEP by the Pharmaceutical Benefits Scheme (PBS) to 100% be the best way to prevent HIV infections, or would that funding be better spent on educational campaigns to achieve a better outcome?**

To assess this we'll be tracking a hybrid outcome of preventing infections while also being cost-effective — preferring prevention even if treating the disease could technically be cheaper.

### Why this question

Every five years Australia produces a National HIV Strategy, the current one lasting from 2018–2022 (Department of Health, 2018). Constructing this model could help decide choices in the future funding model for the Australian federal government in their 2023–2028 strategy, and hopefully play a part in helping to end HIV in Australia.

## State of the art

In preparing this model I analysed two reported models in the field: *Modelling the Epidemiological Impact and Cost-Effectiveness of PrEP for HIV Transmission in MSM in China* (Zhang et al., 2021), and *A Cost-effectiveness Analysis of HIV Pre-exposure Prophylaxis for Men Who Have Sex With Men in Australia* (Schneider et al., 2014), for the Kirby Institute.

Zhang et al. reported using a compartmental system dynamics model, running it six times with a variety of assumptions about the coverage and effectiveness of PrEP. Their basis of cost-effectiveness focused on the governmental and organisational side of the equation and less on the patient end — asking whether China could afford the cost of care if nothing more was done to prevent infections, and at what level of coverage the cost became tolerable.

Schneider et al. used an agent-based model instead, answering a very precise question about how different strategies for providing PrEP affect clinical and cost outcomes, simulating from transmission through to progression. This was a fascinating paper to read through and understand the level of detailed thought needed to accurately simulate the depth of interaction between these agents. Probably because it was conducted a few years before the PBS started subsidising PrEP, there was a lack of modelling of the effect that economic stratification has on people's ability to afford the prescription, as well as their access to education and protection.

Modelling PrEP coverage across the Australian population needs a factorisation of how the cost of PrEP works itself into different strata of socioeconomic populations. Under the current PBS scheme there are only two levels of subsidy: $41.00 for general patients and $6.60 for concession card holders, per month's prescription. Compared to other countries this is an amazing price. But we can still do better by not assuming everyone has the same access to education about these medications, while also factoring in how people's attitudes towards PrEP influence how they prioritise their budgeting — even down to how affordable a $41.00 or $6.60 prescription really is.

## The model

Because we are asking how the tweaking of policy settings affects the whole population, I built this using a system dynamics approach. That lets us adjust the interactions between different factors and see how they play out across the population, rather than an agent-based model which would tell us more about interactions between individual agents than about the whole.

The central equation is **infections per month**, broken into three factors: viral infection rate, PrEP use, and condom use. Each iteration calculates the chance of infection and moves people from the non-infected population to the infected. The simulation runs until either the whole population is infected or an unreasonable amount of time has passed.

<figure>
<img src="/images/prep/modelOverView.png" alt="Overview diagram of the system dynamics model, showing infections per month broken down into viral infection rate, PrEP use and condom use, with their sub-factors" loading="lazy" />
<figcaption>The model overview — every factor and how they feed each other.</figcaption>
</figure>

### Viral infection rate

I based this on a simplification of Schneider et al.'s approach, removing factors like the type and number of sex acts per month. This means an assumption in the model is that each individual engages in one sex act per month. That artificially lowers the infection chance against the reference population, but it simplified things by not needing to specify ages, relationship types, or differing rates between people.

Using AFAO data, the rate was broken into four factors: achieved undetectable viral load, receiving treatment, status awareness, and virulence. From the report we expected about 20% of people with HIV to have an unsuppressed viral load, meaning they can infect another person. The last factor is virulence — since we're not accounting for the type of intercourse, we assume the highest virulence figure so we don't underestimate the chance of infection.

### PrEP use and condom use

Each is constructed identically, breaking into three sub-factors: adherence, patient choice, and effectiveness. Patient choice further breaks down into education and affordability, both modified by economic inaffordability.

**Adherence.** One of the issues with PrEP is the need to take a daily pill. Taken properly it is nearly 100% effective at preventing HIV infection, but inconsistency causes effectiveness to fall — so it made sense to include this as a factor. It makes even more sense for condoms, where adherence of only 64% to proper use significantly decreases overall protection.

**Patient choice.** Affordability is the fraction of the population who can afford that form of protection. Education additionally accounts for the percentage who have been educated on its use and effectiveness, modified by economic inaffordability — assuming that a person less able to afford a type of protection is also less likely to have received proper education about it. On reflection, that's a fairly biased and privileged assumption to make, especially since I conducted no research to confirm it.

**Economic inaffordability.** The percentage of the population who cannot afford protection. 90% inaffordability means only 10% of the population can afford it.

**Effectiveness.** The base level of protection a person has when exposed to HIV while using that type of protection.

## Results

In general, the results show that as the percentage of the population unable to afford protection increased, so did the rate of HIV infections. That increase only becomes evident in the long run.

<figure>
<img src="/images/prep/DA.png" alt="Model output at 301 months showing 9,441 people with HIV" loading="lazy" />
<figcaption>301 months in — 9,441 people with HIV.</figcaption>
</figure>

After 301 months, or 25 years, the number of people with HIV is 9,441 — about 31 infections per month over that period, which seems pretty manageable. That works out to 372 new cases in a year, similar to the 316 actual new infections in 2019 (AFAO 2021).

<figure>
<img src="/images/prep/DB.png" alt="Model output 12.5 years later showing 28,577 people with HIV" loading="lazy" />
<figcaption>12.5 years later — 28,577.</figcaption>
</figure>

But as the number of people with HIV increases, so does the infection rate. Just 12.5 years later the number is 28,577 — 127 infections per month, a fourfold increase. At that rate, a year's worth of infections would be 1,524.

<figure>
<img src="/images/prep/DC.png" alt="Model output 25 years later showing 203,160 people with HIV" loading="lazy" />
<figcaption>Another 25 years — 203,160.</figcaption>
</figure>

Just 25 years later the number is 203,160. Over that last 12.5-year period it's 801 infections per month; across that year we'd expect 49,659 infections. It takes time for the exponential effect to become noticeable. A lack of mitigation 62 years earlier in the simulation leads to a catastrophic pandemic in 2083.

<figure class="stack">
<img src="/images/prep/DD1.png" alt="Comparison output, low inaffordability scenario, first view" loading="lazy" />
<img src="/images/prep/DD2.png" alt="Comparison output, low inaffordability scenario, second view" loading="lazy" />
<img src="/images/prep/DD3.png" alt="Comparison output, low inaffordability scenario, third view" loading="lazy" />
<figcaption>The same model at 10% inaffordability instead of 90%.</figcaption>
</figure>

Comparing that outlook to 90% of the population being unable to afford PrEP and condoms versus only 10%, we see a startling difference: 1,662 people with HIV, and 1 infection per month. From the infection-rate graph we can see infections still increasing over time — projected further out, they'd reach the levels of the 90% simulation by the year 5408, some 3,387 years into the future. So the simulation does show that increasing affordability lowers risk, and therefore saves lives and money.

<figure class="stack">
<img src="/images/prep/DE1.png" alt="Cumulative treatment cost at 10% inaffordability" loading="lazy" />
<img src="/images/prep/DE2.png" alt="Cumulative treatment cost at 90% inaffordability" loading="lazy" />
<figcaption>Cumulative treatment cost — 10% inaffordability against 90%.</figcaption>
</figure>

At 10% inaffordability the total treatment cost is 1.9 trillion, which is a lot — but compared to 60.6 trillion at 90% inaffordability, mitigating clearly saves tens of trillions in the long run.

Yet projecting this far highlights an unforeseen limitation of the approach. Assuming the entire population is 20 years old at the start, by this point they'd all be 82 — currently the male life expectancy in Australia. Approximately half our population should have died by then regardless of HIV status, and the rest will almost certainly die soon. There would also be new people born, which isn't factored in at all.

An underlying bias I had when building this was that the effects of mitigation now would be evident within the next ten years. That's just not the case.

<figure>
<img src="/images/prep/DF.png" alt="Model output at 40% PrEP uptake showing 119,082 people with HIV at 750 months" loading="lazy" />
<figcaption>At 40% PrEP uptake — closer to reality, still not good.</figcaption>
</figure>

The truth is that Australia is world-leading in its work to prevent and treat HIV. About 40% of the Australian MSM population regularly use PrEP. Simulating at 40%, by 750 months (62.5 years) the total is 119,082 — certainly less than 203k, but still not what you'd call world-leading.

Here we hit an error in one of my assumptions: that the affordability of PrEP and condoms is the same. In reality you can buy condoms in-store, but all sexual health clinics offer free condom packs. And even without free condoms, assuming a $42 drug and a 50c condom are equally affordable is a bad assumption that should be fixed in future iterations. We can mitigate it by removing the affordability fraction from the condom-use equation, assuming anyone can afford a condom.

<figure class="stack">
<img src="/images/prep/DG1.png" alt="Model output with a corrected condom affordability factor, first view" loading="lazy" />
<img src="/images/prep/DG2.png" alt="Model output with a corrected condom affordability factor, second view" loading="lazy" />
<figcaption>With a realistic condom affordability factor — 19,991 at 750 months.</figcaption>
</figure>

Factoring in a more realistic condom affordability, we see a dramatic 100k decrease — 19,991 people with HIV at 750 months. That's a difference of 400,000 cases between subsidised and non-subsidised condoms.

It shows that having more protection prevents infections *now*, changing the geometry of the case curve, producing a smaller gradient leading into where the exponential effects start. It would be easy to read this as the subsidy merely pushing the exponential conversion further into the future — but that forgets we are modelling people's lives in the real world. There are complexities in the physical, tangible world affecting infection risk and treatment, which mean that the longer the lead-in curve, the more likely that exponential conversion **never happens at all.**

It has been 40 years since the start of the AIDS pandemic and three years since the PBS began subsidising PrEP. If we institute a policy change that lowers case numbers over the next forty years, who knows what new drugs and treatments will become available. An injectable version of PrEP is currently in clinical trials; if approved, it almost completely removes adherence from the model. Factoring in when and if technological advances arrive is next to wishful thinking. Rather, it is our responsibility now to use the best modelling to apply the best tools — so that we create space for those innovations, rather than hoping they fix our problems for us.

## Conclusion

The model shows that increasing the affordability of PrEP decreases HIV case numbers, saving trillions for the Commonwealth over the next sixty years.

It's hard to claim from this model that increasing education funding would also lower case numbers, because of a fault in the construction of the model. Yet discovering the faults in that construction, and the assumptions underneath it, highlights the complexity inherent in modelling relationships between people over many years. Slight variances at the outset can cause a variance of 400,000 cases when modelled far enough into the future.

In future models I'd experiment with an agent-based approach, so we could add lifespan into the modelling as well as more detail in how agents interact.

Overall this has highlighted for me the effect that small policy choices today have on the future. Taking action now allows for a greater chance of change later.

---

## References

AFAO. (2021). [HIV in Australia](https://www.afao.org.au/wp-content/uploads/2020/12/HIV-in-Australia-2021.pdf). Australian Federation of AIDS Organisations.

Department of Health. (2018). *National HIV Strategy (8).* Commonwealth of Australia.

Ending HIV. (2021). [About undetectable and HIV](https://endinghiv.org.au/treat-early/about-undetectable/).

Ending HIV. (2021). [HIV treatments](https://endinghiv.org.au/treat-early/all-about-treatment/).

Kirby Institute. (2021). [Monitoring HIV pre-exposure prophylaxis (PrEP) uptake in Australia: Issue 1](https://kirby.unsw.edu.au/report/monitoring-hiv-prep-uptake-australia-issue1).

Kirby Institute. (2021). [Monitoring HIV pre-exposure prophylaxis (PrEP) uptake in Australia: Issue 4](https://kirby.unsw.edu.au/report/monitoring-hiv-prep-uptake-australia-issue4).

Schneider, K., Gray, R. T., & Wilson, D. P. (2014). [A cost-effectiveness analysis of HIV pre-exposure prophylaxis for men who have sex with men in Australia](https://doi.org/10.1093/cid/cit946). *Clinical Infectious Diseases, 58*(7), 1027–1034.

Simon, C. (2020). [The SIR dynamic model of infectious disease transmission and its analogy with chemical kinetics](https://doi.org/10.26434/chemrxiv.12021342).

Zhang, L., Peng, P., Wu, Y., Ma, X., Soe, N. N., Huang, X., Wu, H., Markowitz, M., & Meyers, K. (2018). [Modelling the epidemiological impact and cost-effectiveness of PrEP for HIV transmission in MSM in China](https://doi.org/10.1007/s10461-018-2205-3). *AIDS and Behavior, 23*(2), 523–533.
