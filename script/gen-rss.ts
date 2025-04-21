const fs = require("fs/promises");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

async function generate() {
  const feed = new RSS({
    title: "Your Name",
    site_url: "https://yoursite.com",
    feed_url: "https://yoursite.com/feed.xml",
  });

  const posts = await fs.readdir(
    path.join(__dirname, "..", "content", "posts")
  );
  const allPosts: any[] = [];

  await Promise.all(
    posts.map(async (name: any) => {
      if (name.startsWith("index.")) return;

      const content = await fs.readFile(
        path.join(__dirname, "..", "content", "posts", name)
      );
      const frontmatter = matter(content);

      allPosts.push({
        title: frontmatter.data.title,
        url: "/posts/" + name.replace(/\.mdx?/, ""),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        // categories: frontmatter.data.tag.split(", "),
        // author: frontmatter.data.author,
      });
    })
  );

  allPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  allPosts.forEach((post) => {
    feed.item(post);
  });
  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
