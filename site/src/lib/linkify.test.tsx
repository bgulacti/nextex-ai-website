import { isValidElement, type ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { linkify } from "@/lib/linkify";

type AnchorProps = { href: string; target: string; rel: string; children: string };

/** The links linkify produced, as their href values. */
function hrefs(text: string): string[] {
  return linkify(text)
    .filter(isValidElement)
    .map((el) => (el as ReactElement<AnchorProps>).props.href);
}

describe("linkify", () => {
  it("returns plain text unchanged", () => {
    expect(linkify("No links here.")).toEqual(["No links here."]);
  });

  it("returns a single empty string for empty text", () => {
    expect(linkify("")).toEqual([""]);
  });

  it("turns a URL in the middle of text into a link", () => {
    const parts = linkify("Watch https://www.youtube.com/watch?v=abc now");
    expect(parts[0]).toBe("Watch ");
    expect(hrefs("Watch https://www.youtube.com/watch?v=abc now")).toEqual([
      "https://www.youtube.com/watch?v=abc",
    ]);
    expect(parts[2]).toBe(" now");
  });

  it("handles URLs at the start and end", () => {
    expect(hrefs("https://a.com middle https://b.com")).toEqual(["https://a.com", "https://b.com"]);
  });

  it("supports http and https, not bare domains", () => {
    expect(hrefs("http://a.com and www.nextex-ai.com")).toEqual(["http://a.com"]);
  });

  it("stops the URL at whitespace, including newlines", () => {
    expect(hrefs("see https://a.com/x\nnext line")).toEqual(["https://a.com/x"]);
  });

  it("opens links in a new tab without leaking the opener", () => {
    const link = linkify("https://a.com").find(isValidElement) as ReactElement<AnchorProps>;
    expect(link.props.target).toBe("_blank");
    expect(link.props.rel).toBe("noopener noreferrer");
    expect(link.props.children).toBe("https://a.com");
  });

  it("gives each link a distinct key", () => {
    const keys = linkify("https://a.com https://b.com").filter(isValidElement).map((el) => el.key);
    expect(new Set(keys).size).toBe(2);
  });
});
