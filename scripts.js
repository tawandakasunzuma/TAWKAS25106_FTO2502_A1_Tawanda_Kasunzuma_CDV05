// A sample podcast data object
const podcast = {
  title: "Fresh and Fit",
  hosts: ["Myron", "Fresh"],
  explicitContent: true,
  founded: 2018,
  episodes: 421
};

// Helper functions for rendering
function describePodcast(p) {
  return `Podcast '${p.title}' has ${p.episodes} episodes and is${p.explicitContent ? "" : " not"} explicit.`;
}

function getTitle(p) {
  return p.title;
}

function getEpisodeCount(p) {
  return `${p.episodes} episodes`;
}

function wrapInTag(tag, content) {
  return `<${tag}>${content}</${tag}>`;
}

function renderPodcastSummaryHTML(p) {
  const titleHTML = wrapInTag("h2", getTitle(p));
  const countHTML = wrapInTag("span", getEpisodeCount(p));
  const summaryText = describePodcast(p);
  const summaryHTML = wrapInTag("p", summaryText);
  return titleHTML + countHTML + summaryHTML;
}

class PodcastPreview extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'hosts', 'episodes', 'explicit-content'];
    }

    constructor () {
        super ();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback () {
        this.render ();
    }
    
    render() {
    this.shadow.innerHTML = `
        <style>
        div {
            border: 2px solid green;
            padding: 10px;
            border-radius: 8px;
            font-family: sans-serif;
        }
        h2 {
            margin: 0 0 0.5em 0;
        }
        span {
            font-weight: bold;
        }
        </style>
        <div>
        ${renderPodcastSummaryHTML(podcast)}
        </div>
    `;
    }
}

customElements.define('podcast-preview', PodcastPreview);