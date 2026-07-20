import nicolaClaytonPhoto from "../image/Professor Nicola Clayton.webp";
import lisaHipgravePhoto from "../image/Lisa Hipgrave.webp";
import barrySmithPhoto from "../image/Barry C. Smith.webp";

/** Section landing — témoignages académiques / industrie (Project Proust). */
export const EXPERT_QUOTES_COPY = {
  title: "Shaped by science",
  subtitle:
    "Madeleine has been shaped by conversations with leading experts in memory science and perfumery. We would like to thank those who shared their knowledge during the project's early development.",
  experts: [
    {
      id: "lisa-hipgrave",
      name: "Lisa Hipgrave",
      affiliation: "IFRA UK",
      role: "Director of the International Fragrance Association UK (IFRA UK) and a highly respected fragrance industry specialist with decades of experience in perfumery, fragrance safety, regulation, and innovation.",
      quote:
        "Our emotions and memories are powerfully influenced by odour and fragrance — our sense of smell is directly linked to the limbic system: the hippocampus, where learning and memory occur, and the amygdala, where emotional processing happens. No other sense is as closely associated. It is no wonder that fragrances can help with memory therapy, lift our mood, and enhance our wellbeing.",
      attribution: null,
      photo: lisaHipgravePhoto,
      photoAlt: "Lisa Hipgrave, Director IFRA UK",
    },
    {
      id: "nicola-clayton",
      name: "Professor Nicola Clayton",
      affiliation: "University of Cambridge",
      role: "Professor of Comparative Cognition at the University of Cambridge and Fellow of the Royal Society, renowned for her research into episodic memory, imagination, and how meaningful experiences become lasting memories.",
      quote:
        "Mental time travel allows us to revisit our memories and imagine future scenarios.",
      attribution:
        "Nicola Clayton & Clive Wilkins, Memory, mental time travel and The Moustachio Quartet (2017)",
      photo: nicolaClaytonPhoto,
      photoAlt: "Professor Nicola Clayton",
    },
    {
      id: "barry-smith",
      name: "Professor Barry C. Smith",
      affiliation: "University of London",
      role: "Director of the Centre for the Study of the Senses, University of London. An internationally recognised philosopher of the senses whose research explores olfaction, flavour perception, and the unique relationship between smell, memory, and emotion.",
      quote: "Smell has a privileged connection to memory and emotion.",
      attribution:
        "Professor Barry C. Smith (2016) — discussion of the Proust phenomenon and olfaction",
      photo: barrySmithPhoto,
      photoAlt: "Professor Barry C. Smith",
    },
  ],
};
