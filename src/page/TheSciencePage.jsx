import { Link } from "react-router-dom";
import SectionLogoWatermark from "../components/layout/SectionLogoWatermark";
import SiteChrome from "../components/layout/SiteChrome";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { THE_SCIENCE_SEO, absoluteUrl } from "../config/seoMeta";

export default function TheSciencePage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={THE_SCIENCE_SEO.title}
        description={THE_SCIENCE_SEO.description}
        keywords={THE_SCIENCE_SEO.keywords}
        canonicalUrl={absoluteUrl(THE_SCIENCE_SEO.canonicalPath)}
      />
      <section
        className="relative isolate overflow-hidden bg-wine px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
        aria-labelledby="science-our-story-heading"
      >
        <SectionLogoWatermark variant="wine" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2
            id="science-our-story-heading"
            className="mb-8 font-subtitle text-[10px] uppercase tracking-[0.22em] text-paper/55"
          >
            Our story
          </h2>
          <div className="space-y-6">
            <p className="typo-body-lead text-paper">
              We remembered Proust. In 1913, he had no need for film to recover
              his childhood: a single sip of tea and the scent of a madeleine
              were enough to resurrect a vanished world.
            </p>
            <p className="typo-title text-xl font-light leading-snug text-paper sm:text-2xl">
              We became the Alchemists of Memory.
            </p>
            <p className="typo-body-lead text-paper">
              We abandoned optics for neurology. We created Scentience to
              transform your moments of grace into physical archives. We distill
              the essence of your journeys and your loves into virgin molecules,
              capable of sealing an emotion before time can distort it.
            </p>
            <p className="typo-title text-xl font-light leading-snug text-paper sm:text-2xl">
              We are the first Olfactory Library.
            </p>
            <p className="typo-body-lead text-paper">
              Your shelf does not hold bottles. It holds your biography. A
              sanctuary where, with a single breath, you can become once again
              who you were.
            </p>
          </div>
        </div>
      </section>

      <main className="relative isolate mx-auto max-w-3xl overflow-hidden bg-paper px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <SectionLogoWatermark variant="wine" />
        <div className="relative z-10">
        <p className="landing-muted-text mb-4 text-center font-subtitle uppercase tracking-wider">
          Evidence & care
        </p>
        <h1 className="landing-section-title">The science</h1>
        <div className="space-y-6">
          <p className="typo-body-lead">
            Olfactory memory is unusually direct: smell projects to limbic areas
            linked to emotion and autobiographical recall. That is why a single
            note can reopen a room you thought you had forgotten—often faster
            than a photograph.
          </p>

          <figure className="my-10 border-l-4 border-wine/35 py-6 pl-6 pr-4 sm:my-12 sm:pl-8 sm:pr-6">
            <figcaption className="mb-4 font-subtitle text-[10px] uppercase tracking-[0.18em] text-wine/85">
              Lisa Hipgrave — Director, IFRA UK (International Fragrance
              Association)
            </figcaption>
            <blockquote className="border-0 p-0">
              <p className="typo-body-lead italic leading-[1.75] text-ink/88">
                “Our emotions and memories are powerfully influenced by odour
                and fragrance, this is because our sense of smell is directly
                linked to the areas of our brain (known as the limbic system)
                which are responsible for learning and memory (the hippocampus)
                and where emotional processing occurs (the amygdala). No other
                sense is as closely associated. So, it is no wonder that
                fragrances can help with memory therapy, help lift our mood, and
                enhance our wellbeing.”
              </p>
            </blockquote>
          </figure>

          <figure className="my-10 border-l-4 border-wine/35 py-6 pl-6 pr-4 sm:my-12 sm:pl-8 sm:pr-6">
            <blockquote className="border-0 p-0">
              <p className="typo-body-lead italic leading-[1.75] text-ink/88">
                “Memories evoked by smells are more vivid, emotional and longer
                lasting than those caused by other sensory modalities.”
              </p>
            </blockquote>
            <figcaption className="mt-4 font-subtitle text-[10px] uppercase tracking-[0.16em] text-mist not-italic">
              Chu and Downes, 2002
            </figcaption>
          </figure>

          <p className="typo-body-lead">
            That’s because the olfactory lobe has a privileged neural connection
            to the amygdala, responsible for emotional and memory processing and
            storage.
          </p>

          <p className="typewriter-face text-center text-sm font-normal normal-case leading-relaxed text-wine sm:text-left sm:text-base">
            Humans possess an under-appreciated evolutionary superpower; unlock
            yours now.
          </p>

          <p className="typo-body-lead">
            Scentience formulations follow IFRA / EU / UK guidance. Allergens
            are disclosed, batches are traceable, and your profile data is
            handled with privacy-by-design defaults—including deletion on
            request.
          </p>
          <p className="typo-body-lead">
            For the full compliance snapshot from the homepage, see{" "}
            <Link to="/#faq" className="text-wine underline underline-offset-4">
              Frequently Asked Questions
            </Link>{" "}
            or return to the{" "}
            <Link to="/" className="text-wine underline underline-offset-4">
              home page
            </Link>
            .
          </p>
          <p className="typo-body-lead">
            Contribute to our public framing of odour-evoked memory:{" "}
            <Link
              to="/science/what-is-your-proust-madeleine"
              className="text-wine underline underline-offset-4"
            >
              The Project Proust
            </Link>
            .
          </p>
        </div>
        </div>
      </main>
    </SiteChrome>
  );
}
