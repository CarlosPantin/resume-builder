import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function EditableResume() {
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "Full Name",
    contact:
      "City, Country | Phone +00 000 000 0000 | email@example.com | https://yourportfolio.com",
  });

  const [skillCategories, setSkillCategories] = useState([
    { label: "Languages", content: "JavaScript, Python, Java, C++, etc." },
    { label: "Frontend", content: "React, Angular, Vue, HTML, CSS, Tailwind" },
    { label: "Backend", content: "Node.js, Express, Django, Flask, Spring" },
    { label: "Database", content: "PostgreSQL, MySQL, MongoDB, Firebase" },
    { label: "DevOps", content: "Docker, Kubernetes, AWS, Azure, GCP" },
  ]);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Company Name",
      location: "City, Country",
      title: "Job Title",
      date: "Month Year - Month Year",
      bullets: [
        "Accomplished [specific achievement] resulting in [specific benefit].",
        "Led team of [X] people to implement [specific project] that improved [specific metric] by [X%].",
        "Developed [specific feature/tool] that [specific benefit].",
      ],
    },
    {
      id: 2,
      company: "Previous Company",
      location: "City, Country",
      title: "Previous Role",
      date: "Month Year - Month Year",
      bullets: [
        "Implemented [specific process/system] that improved [specific metric].",
        "Collaborated with [specific teams] to deliver [specific outcome].",
        "Managed [specific project/resource] resulting in [specific benefit].",
      ],
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      organization: "Organization Name",
      location: "City, Country",
      title: "Project Title",
      date: "Month Year - Month Year",
      bullets: [
        "Built [specific application/system] using [specific technologies].",
        "Analyzed [specific data/process] to identify [specific insights].",
      ],
    },
    {
      id: 2,
      organization: "Organization Name",
      location: "City, Country",
      title: "Another Project",
      date: "Month Year - Month Year",
      bullets: [
        "Led development of [specific project] that [specific outcome].",
        "Implemented [specific methodology] to ensure [specific benefit].",
        "Collaborated with team to deliver [specific deliverable] on time and within budget.",
      ],
    },
  ]);

  const [educations, setEducations] = useState([
    {
      id: 1,
      institution: "University Name",
      location: "City, Country",
      degree: "Degree Title (e.g., Bachelor of Science in Computer Science)",
      date: "Graduation Date: Month Year",
    },
    {
      id: 2,
      institution: "Another University",
      location: "City, Country",
      degree: "Advanced Degree (e.g., Master of Science in Data Science)",
      date: "Graduation Date: Month Year",
    },
  ]);

  // Functions to add new items
  const addSkillCategory = () => {
    setSkillCategories([
      ...skillCategories,
      { label: "New Category", content: "Skills description" },
    ]);
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        id: Date.now(),
        company: "Company Name",
        location: "City, Country",
        title: "Position Title",
        date: "Start - End",
        bullets: ["Describe your responsibility or achievement here"],
      },
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        organization: "Organization Name",
        location: "City, Country",
        title: "Project Title",
        date: "Start - End",
        bullets: ["Describe your project contribution here"],
      },
    ]);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        institution: "University Name",
        location: "City, Country",
        degree: "Degree Title",
        date: "Graduation Date: Month Year",
      },
    ]);
  };

  // Functions to remove items
  const removeSkillCategory = (index) => {
    setSkillCategories(skillCategories.filter((_, i) => i !== index));
  };

  const removeJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const removeEducation = (id) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  // Functions to add bullet points
  const addBullet = (array, setArray, id) => {
    setArray(
      array.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            bullets: [...(item.bullets || []), "New bullet point"],
          };
        }
        return item;
      })
    );
  };

  // Functions to remove bullet points
  const removeBullet = (array, setArray, id, bulletIndex) => {
    setArray(
      array.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            bullets: item.bullets.filter((_, i) => i !== bulletIndex),
          };
        }
        return item;
      })
    );
  };

  // Handle content changes
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skillCategories];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkillCategories(newSkills);
  };

  const handleItemChange = (array, setArray, id, field, value) => {
    setArray(
      array.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleBulletChange = (array, setArray, id, index, value) => {
    setArray(
      array.map((item) => {
        if (item.id === id) {
          const newBullets = [...item.bullets];
          newBullets[index] = value;
          return { ...item, bullets: newBullets };
        }
        return item;
      })
    );
  };

  // Create HTML string version for PDF export (fixes color format issues)
  const createPrintableVersion = () => {
    // Create basic styles
    const styles = `
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .resume-container {
        max-width: 800px;
        margin: 0 auto;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .contact {
        font-size: 14px;
        margin-bottom: 20px;
      }
      .section {
        margin-bottom: 20px;
      }
      .section-title {
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
        margin-bottom: 10px;
      }
      .skill-row {
        display: flex;
        margin-bottom: 5px;
      }
      .skill-category {
        width: 120px;
        font-weight: 600;
      }
      .skill-content {
        flex-grow: 1;
      }
      .experience-item {
        margin-bottom: 15px;
      }
      .org-header {
        display: flex;
        justify-content: space-between;
      }
      .org-name {
        font-weight: 600;
      }
      .org-location {
        font-size: 14px;
        color: #555;
      }
      .position-header {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
      .position-title {
        font-weight: normal;
      }
      .position-date {
        font-size: 14px;
        color: #555;
      }
      ul {
        margin-top: 8px;
        padding-left: 20px;
      }
      li {
        margin-bottom: 4px;
      }
    `;

    // Start building HTML document
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${styles}</style>
        <title>${personalInfo.name} CV</title>
      </head>
      <body>
        <div class="resume-container">
          <!-- Header -->
          <div class="header">
            <div class="name">${personalInfo.name}</div>
            <div class="contact">${personalInfo.contact}</div>
          </div>
          
          <!-- Skills Section -->
          <div class="section">
            <div class="section-title">SKILLS & INTERESTS</div>
            ${skillCategories
              .map(
                (skill) => `
              <div class="skill-row">
                <div class="skill-category">${skill.label}:</div>
                <div class="skill-content">${skill.content}</div>
              </div>
            `
              )
              .join("")}
          </div>
          
          <!-- Experience Section -->
          <div class="section">
            <div class="section-title">PROFESSIONAL EXPERIENCE</div>
            ${jobs
              .map(
                (job) => `
              <div class="experience-item">
                <div class="org-header">
                  <div class="org-name">${job.company}</div>
                  <div class="org-location">${job.location}</div>
                </div>
                <div class="position-header">
                  <div class="position-title">${job.title}</div>
                  <div class="position-date">${job.date}</div>
                </div>
                <ul>
                  ${job.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
                </ul>
              </div>
            `
              )
              .join("")}
          </div>
          
          <!-- Projects Section -->
          <div class="section">
            <div class="section-title">PROJECT EXPERIENCE</div>
            ${projects
              .map(
                (project) => `
              <div class="experience-item">
                <div class="org-header">
                  <div class="org-name">${project.organization}</div>
                  <div class="org-location">${project.location}</div>
                </div>
                <div class="position-header">
                  <div class="position-title">${project.title}</div>
                  <div class="position-date">${project.date}</div>
                </div>
                <ul>
                  ${project.bullets
                    .map((bullet) => `<li>${bullet}</li>`)
                    .join("")}
                </ul>
              </div>
            `
              )
              .join("")}
          </div>
          
          <!-- Education Section -->
          <div class="section">
            <div class="section-title">EDUCATION</div>
            ${educations
              .map(
                (education) => `
              <div class="experience-item">
                <div class="org-header">
                  <div class="org-name">${education.institution}</div>
                  <div class="org-location">${education.location}</div>
                </div>
                <div class="position-header">
                  <div class="position-title">${education.degree}</div>
                  <div class="position-date">${education.date}</div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  };

  // Function to handle PDF download
  const handleDownload = async () => {
    // Set downloading state to true to show loading indicator
    setDownloading(true);

    try {
      // Instead of cloning DOM elements which might have problematic styles,
      // we'll generate a clean HTML string with basic styling
      const htmlContent = createPrintableVersion();

      // Create a temporary div to hold our HTML content
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = htmlContent;
      document.body.appendChild(tempContainer);

      // Configure the PDF options
      const opt = {
        margin: 10,
        filename: `${personalInfo.name.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: false, // Disable logging
          letterRendering: true,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      };

      // Generate and download the PDF
      await html2pdf().from(tempContainer).set(opt).save();

      // Remove the temporary container
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      // Reset downloading state
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-6">
        <div className="w-64 bg-gray-100 p-4 rounded shadow-sm">
          <h2 className="text-lg font-bold mb-4">CV Controls</h2>
          <div className="space-y-3">
            <button
              onClick={addSkillCategory}
              className="w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 text-sm"
            >
              Add Skill Category
            </button>
            <button
              onClick={addJob}
              className="w-full bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 text-sm"
            >
              Add Experience
            </button>
            <button
              onClick={addProject}
              className="w-full bg-purple-500 text-white py-2 px-3 rounded hover:bg-purple-600 text-sm"
            >
              Add Project
            </button>
            <button
              onClick={addEducation}
              className="w-full bg-orange-500 text-white py-2 px-3 rounded hover:bg-orange-600 text-sm"
            >
              Add Education
            </button>

            <div className="my-6 pt-4 border-t border-gray-300">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 font-medium flex items-center justify-center ${
                  downloading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {downloading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-gray-600 mt-4">
              <p>• Click on any text to edit directly</p>
              <p>• Hover to see add/remove options</p>
              <p>• All changes are saved automatically</p>
              <p>• Download to generate a PDF version</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div ref={resumeRef} className="bg-white shadow-md rounded p-8 mb-6">
            {/* CV CONTENT */}
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div
                className="text-2xl font-bold text-center mb-1"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handlePersonalInfoChange("name", e.target.textContent)
                }
              >
                {personalInfo.name}
              </div>
              <div
                className="text-center mb-6"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handlePersonalInfoChange("contact", e.target.textContent)
                }
              >
                {personalInfo.contact}
              </div>

              {/* Skills Section */}
              <Section title="SKILLS & INTERESTS">
                <div className="mb-2">
                  {skillCategories.map((category, index) => (
                    <div key={index} className="flex group items-start mb-1">
                      <div className="w-32 flex-shrink-0">
                        <span
                          className="font-semibold"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleSkillChange(
                              index,
                              "label",
                              e.target.textContent
                            )
                          }
                        >
                          {category.label}:
                        </span>
                      </div>
                      <div className="flex-grow">
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleSkillChange(
                              index,
                              "content",
                              e.target.textContent
                            )
                          }
                        >
                          {category.content}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSkillCategory(index)}
                        className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Experience Section */}
              <Section title="PROFESSIONAL EXPERIENCE">
                {jobs.map((job) => (
                  <ExperienceItem
                    key={job.id}
                    item={job}
                    onRemove={() => removeJob(job.id)}
                    onAddBullet={() => addBullet(jobs, setJobs, job.id)}
                    onRemoveBullet={(index) =>
                      removeBullet(jobs, setJobs, job.id, index)
                    }
                    onChangeField={(field, value) =>
                      handleItemChange(jobs, setJobs, job.id, field, value)
                    }
                    onChangeBullet={(index, value) =>
                      handleBulletChange(jobs, setJobs, job.id, index, value)
                    }
                  />
                ))}
              </Section>

              {/* Projects Section */}
              <Section title="PROJECT EXPERIENCE">
                {projects.map((project) => (
                  <ExperienceItem
                    key={project.id}
                    item={project}
                    organizationField="organization"
                    onRemove={() => removeProject(project.id)}
                    onAddBullet={() =>
                      addBullet(projects, setProjects, project.id)
                    }
                    onRemoveBullet={(index) =>
                      removeBullet(projects, setProjects, project.id, index)
                    }
                    onChangeField={(field, value) =>
                      handleItemChange(
                        projects,
                        setProjects,
                        project.id,
                        field,
                        value
                      )
                    }
                    onChangeBullet={(index, value) =>
                      handleBulletChange(
                        projects,
                        setProjects,
                        project.id,
                        index,
                        value
                      )
                    }
                  />
                ))}
              </Section>

              {/* Education Section */}
              <Section title="EDUCATION">
                {educations.map((education) => (
                  <div key={education.id} className="mb-4 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div
                          className="font-semibold"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleItemChange(
                              educations,
                              setEducations,
                              education.id,
                              "institution",
                              e.target.textContent
                            )
                          }
                        >
                          {education.institution}
                        </div>
                        <div
                          className="text-sm text-gray-700"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleItemChange(
                              educations,
                              setEducations,
                              education.id,
                              "location",
                              e.target.textContent
                            )
                          }
                        >
                          {education.location}
                        </div>
                      </div>
                      <button
                        onClick={() => removeEducation(education.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleItemChange(
                            educations,
                            setEducations,
                            education.id,
                            "degree",
                            e.target.textContent
                          )
                        }
                      >
                        {education.degree}
                      </div>
                      <div
                        className="text-sm text-gray-600"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleItemChange(
                            educations,
                            setEducations,
                            education.id,
                            "date",
                            e.target.textContent
                          )
                        }
                      >
                        {education.date}
                      </div>
                    </div>
                  </div>
                ))}
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ExperienceItem({
  item,
  organizationField = "company",
  onRemove,
  onAddBullet,
  onRemoveBullet,
  onChangeField,
  onChangeBullet,
}) {
  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-start">
        <div>
          <div
            className="font-semibold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              onChangeField(organizationField, e.target.textContent)
            }
          >
            {item[organizationField]}
          </div>
          <div
            className="text-sm text-gray-700"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChangeField("location", e.target.textContent)}
          >
            {item.location}
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
      <div className="flex justify-between mt-1">
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChangeField("title", e.target.textContent)}
        >
          {item.title}
        </div>
        <div
          className="text-sm text-gray-600"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChangeField("date", e.target.textContent)}
        >
          {item.date}
        </div>
      </div>
      <ul className="mt-2">
        {item.bullets.map((bullet, index) => (
          <li
            key={index}
            className="group/bullet relative pl-4 mb-1 before:content-['•'] before:absolute before:left-0 before:top-0 flex"
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onChangeBullet(index, e.target.textContent)}
              className="flex-grow"
            >
              {bullet}
            </span>
            <button
              onClick={() => onRemoveBullet(index)}
              className="text-red-500 opacity-0 group-hover/bullet:opacity-100 transition-opacity ml-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onAddBullet}
        className="text-blue-500 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        + Add bullet point
      </button>
    </div>
  );
}
