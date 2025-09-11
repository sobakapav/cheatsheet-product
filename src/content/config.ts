import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const cheatsheetSchema = () => z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  alias: z.array(z.string()),
  section: z.string().optional(),
  tags: z.array(z.object({
    tag: z.string().optional(),
  })),
  focuses: z.array(z.object({
    title: z.string().optional(),
    text: z.string().optional(),
  })),
  advices: z.array(z.object({
    title: z.string().optional(),
    text: z.string().optional(),
  })),
  cases: z.array(z.object({
    title: z.string().optional(),
    text: z.string().optional(),
  })),
  goodExample: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
    linktext: z.string().optional(),
  }),
  badExample: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
    linktext: z.string().optional(),
  }),
  instruments: z.array(z.object({
    title: z.string().optional(),
    text: z.string().optional(),
    img: z.string().optional(),
    link: z.string().optional(),
  })),
  director: z.object({
    text: z.string().optional(),
    person: z.string().optional(),
  }),
});

const cheatsheetCollection = defineCollection({
  loader: glob({ pattern: ['*.json'], base: 'src/content/cheatsheets' }),
  schema: cheatsheetSchema(),
});

const portfolioSchema = () => z.object({
  title: z.string(),
  thumbnail: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  link: z.string(),
});

const portfolioCollection = defineCollection({
  schema: portfolioSchema(),
});

export const collections = {
  post: postCollection,
  cheatsheets: cheatsheetCollection,
  portfolio: portfolioCollection,
};
