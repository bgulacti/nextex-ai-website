import { describe, expect, it } from "vitest";
import { FOUNDERS, getFounders, joinShortNames } from "@/content/team";

describe("getFounders", () => {
  it("returns founders in the order of the ids", () => {
    expect(getFounders(["zeynep", "berk"]).map((f) => f.name)).toEqual([
      "Zeynep Öykü Erdem",
      "Berk Gülaçtı",
    ]);
  });

  it("returns an empty list for no ids", () => {
    expect(getFounders([])).toEqual([]);
  });

  it("skips unknown ids", () => {
    // Cast: simulates stale data, e.g. a removed founder still listed on a post.
    expect(getFounders(["berk", "phil" as never]).map((f) => f.id)).toEqual(["berk"]);
  });
});

describe("joinShortNames", () => {
  const [berk, burak, zeynep] = getFounders(["berk", "burak", "zeynep"]);

  it.each([
    [[], ""],
    [[berk], "Berk"],
    [[berk, burak], "Berk & Burak"],
    [[berk, burak, zeynep], "Berk, Burak & Öykü"],
  ])("%#: joins %j", (founders, expected) => {
    expect(joinShortNames(founders)).toBe(expected);
  });
});

describe("FOUNDERS", () => {
  it("has unique ids", () => {
    const ids = FOUNDERS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("lists only the current founders", () => {
    expect(FOUNDERS.map((f) => f.name)).toEqual([
      "Berk Gülaçtı",
      "Burak Ünal",
      "Zeynep Öykü Erdem",
    ]);
  });
});
