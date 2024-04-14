import getReadingTime from "reading-time";
import stripMarkdown from "strip-markdown";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export function remarkExcerpt() {
  return function (tree, { data }) {
    let value = structuredClone(tree);
    value = stripMarkdown({
      keep: ["blockquote"],
      remove: ["image", "imageReference"],
    })(value);
    value = toString(value).trim();
    const trimmedExcerpt =
      value.at(199) === " "
        ? value.substring(0, 199).trim()
        : value.substring(0, 199).trim().split(" ").slice(0, -1).join(" ");
    data.astro.frontmatter.excerpt = `${trimmedExcerpt}...`;
  };
}
