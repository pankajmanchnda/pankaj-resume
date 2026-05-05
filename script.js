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

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = job.description;

    const bullets = document.createElement("ul");
    job.bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.textContent = bullet;
      bullets.appendChild(li);
    });

    body.append(title, description, bullets);
    item.append(meta, body);
    container.appendChild(item);
  });
}

function renderCapabilities(capabilities) {
  const container = byId("capabilityGrid");
  container.innerHTML = "";

  capabilities.forEach((capability) => {
    const card = document.createElement("article");
    card.className = "capability-card";

    const title = document.createElement("h3");
    title.textContent = capability.title;

    const list = document.createElement("ul");
    capability.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    card.append(title, list);
    container.appendChild(card);
  });
}

function renderOperatingModel(steps) {
  const container = byId("operatingModel");
  container.innerHTML = "";

  steps.forEach((step, index) => {
    const item = document.createElement("article");
    item.className = "model-step";

    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = step.step;

    const detail = document.createElement("p");
    detail.textContent = step.detail;

    item.append(number, title, detail);
    container.appendChild(item);
  });
}

function renderEducation(education, languages) {
  const educationList = byId("educationList");
  const languageList = byId("languageList");
  educationList.innerHTML = "";
  languageList.innerHTML = "";

  education.forEach((item) => {
    const credential = document.createElement("article");
    credential.className = "credential-item";

    const title = document.createElement("h3");
    title.textContent = item.credential;

    const meta = document.createElement("p");
    meta.textContent = `${item.institution} | ${item.period}`;

    credential.append(title, meta);
    educationList.appendChild(credential);
  });

  languages.forEach((language) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = language;
    languageList.appendChild(tag);
  });
}

function renderDifferentiators(items) {
  const container = byId("differentiatorList");
  container.innerHTML = "";

  items.forEach((item) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = item;
    container.appendChild(paragraph);
  });
}

function renderResume(data) {
  resumeData = data;

  document.title = `${data.name} | Operations, AML & AI Transformation`;
  byId("focusLine").textContent = data.focusAreas.join(" | ");
  byId("profileName").textContent = data.name;
  byId("headline").textContent = data.headline;
  byId("positioning").textContent = data.positioning;
  byId("closingLine").textContent = `${data.contact.location}. ${data.contact.workStyle}.`;
  byId("emailButton").href = `mailto:${data.contact.email}`;

  renderContact(data.contact);
  renderMetrics(data.impactMetrics);
  renderSummary(data.summary);
  renderTags("targetRoles", data.targetRoles);
  renderExperience(data.experience);
  renderCapabilities(data.capabilities);
  renderOperatingModel(data.operatingModel);
  renderEducation(data.education, data.languages);
  renderDifferentiators(data.differentiators);

  const editor = byId("dataEditor");
  if (editor && !editor.value) {
    editor.value = JSON.stringify(data, null, 2);
  }
}

async function loadResume() {
  const response = await fetch("resume.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Resume data could not be loaded.");
  }
  return response.json();
}

function enableEditor() {
  const panel = byId("editorPanel");
  const editor = byId("dataEditor");
  const status = byId("editorStatus");

  panel.hidden = false;
  editor.value = JSON.stringify(resumeData, null, 2);

  byId("applyDataButton").addEventListener("click", () => {
    try {
      const nextData = JSON.parse(editor.value);
      renderResume(nextData);
      editor.value = JSON.stringify(nextData, null, 2);
      status.textContent = "Preview updated.";
    } catch (error) {
      status.textContent = `JSON needs a quick fix: ${error.message}`;
    }
  });

  byId("downloadDataButton").addEventListener("click", () => {
    const blob = new Blob([editor.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.json";
    link.click();
    URL.revokeObjectURL(url);
    status.textContent = "Exported resume.json.";
  });
}

byId("printButton").addEventListener("click", () => window.print());

loadResume()
  .then((data) => {
    renderResume(data);
    if (new URLSearchParams(window.location.search).has("edit")) {
      enableEditor();
    }
  })
  .catch((error) => {
    document.body.innerHTML = "";
    const message = document.createElement("main");
    message.className = "load-error";
    message.append(
      text("The resume page could not load its editable data file. Open it through a local server or GitHub Pages.")
    );
    document.body.appendChild(message);
    console.error(error);
  });
