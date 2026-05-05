let resumeData = null;

const byId = (id) => document.getElementById(id);

const text = (value) => {
  const span = document.createElement("span");
  span.textContent = value;
  return span;
};

function renderContact(contact) {
  const strip = byId("contactStrip");
  strip.innerHTML = "";

  const contactItems = [
    { label: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    { label: contact.email, href: `mailto:${contact.email}` },
    { label: "View My GitHub Projects", href: contact.github },
    { label: contact.location },
    { label: contact.workStyle }
  ].filter((item) => item.label);

  contactItems.forEach((item) => {
    const element = item.href ? document.createElement("a") : document.createElement("span");
    element.className = "contact-pill";
    element.textContent = item.label;
    if (item.href) element.href = item.href;
    strip.appendChild(element);
  });
}

function renderMetrics(metrics) {
  const container = byId("impactMetrics");
  container.innerHTML = "";

  metrics.forEach((metric) => {
    const item = document.createElement("article");
    item.className = "metric";

    const value = document.createElement("strong");
    value.textContent = metric.value;

    const label = document.createElement("span");
    label.textContent = metric.label;

    item.append(value, label);
    container.appendChild(item);
  });
}

function renderSummary(summary) {
  const container = byId("summaryList");
  container.innerHTML = "";

  summary.forEach((item) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = item;
    container.appendChild(paragraph);
  });
}

function renderTags(id, items) {
  const container = byId(id);
  container.innerHTML = "";

  items.forEach((item) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item;
    container.appendChild(tag);
  });
}

function renderExperience(experience) {
  const container = byId("experienceList");
  container.innerHTML = "";

  experience.forEach((job) => {
    const item = document.createElement("article");
    item.className = "experience-item";

    const meta = document.createElement("div");
    meta.className = "experience-meta";

    const period = document.createElement("p");
    period.className = "period";
    period.textContent = job.period;

    const company = document.createElement("p");
    company.className = "company";
    company.textContent = job.company;

    meta.append(period, company);

    const body = document.createElement("div");
    body.className = "experience-body";

    const title = document.createElement("h3");
    title.textContent = job.role;
