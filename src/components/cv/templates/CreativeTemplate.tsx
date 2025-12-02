import { CVData } from '@/types/cv';
import { parseRichText, hasListItems } from '@/lib/richTextParser';
import { Mail, Phone, MapPin } from 'lucide-react';

interface CreativeTemplateProps {
  data: CVData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { colorScheme } = data;
  
  const formatDate = (start: string, end: string, current: boolean) => {
    if (!start) return '';
    const startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const endDate = current ? 'Present' : end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    return `${startDate} - ${endDate}`;
  };

  const renderRichText = (text: string) => {
    const parsed = parseRichText(text);
    const isList = hasListItems(text);
    
    if (isList) {
      return <ul className="list-none space-y-0.5 mt-1" dangerouslySetInnerHTML={{ __html: parsed }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: parsed }} />;
  };

  return (
    <div className="creative-template bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5pt' }}>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            * {
              overflow: visible !important;
            }
            .creative-template {
              box-shadow: none !important;
              margin: 0 !important;
            }
          }
          @media screen {
            .creative-template {
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
          }
        `}
      </style>

      {/* Sidebar - Left Column with Distinct Visual Style */}
      <aside className="w-[35%] p-4" style={{ backgroundColor: colorScheme.primary, color: 'white' }}>
        <div className="mb-3 pb-2 border-b border-white/30">
          <h1 className="font-bold mb-1 break-words text-xl leading-tight">{data.personalInfo.fullName}</h1>
          <p className="text-[6.5pt] font-light tracking-widest uppercase opacity-75 mb-1">Curriculum Vitae</p>
          <p className="opacity-90 text-[9pt] leading-snug">{data.personalInfo.title}</p>
          {data.personalInfo.additionalInfo && (
            <div className="mt-1.5 opacity-90 text-[7.5pt] leading-snug">
              {renderRichText(data.personalInfo.additionalInfo)}
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="mb-3">
          <h2 className="font-bold mb-1 pb-0.5 border-b border-white/30 text-[9pt] uppercase tracking-wide">Contact</h2>
          <div className="space-y-1 text-[7.5pt]">
            {data.personalInfo.email && (
              <div className="flex items-start gap-1.5">
                <Mail className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-start gap-1.5">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold mb-1 pb-0.5 border-b border-white/30 text-[9pt] uppercase tracking-wide">Skills</h2>
            <div className="space-y-1.5">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-0.5 text-[7.5pt]">
                    <span className="font-medium">{skill.name}</span>
                    <span className="opacity-80">{skill.level}%</span>
                  </div>
                  <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${skill.level}%`,
                        backgroundColor: colorScheme.accent
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold mb-1 pb-0.5 border-b border-white/30 text-[9pt] uppercase tracking-wide">Interests</h2>
            <div className="space-y-0.5 text-[7.5pt]">
              {data.hobbies.map((hobby) => (
                <div key={hobby.id}>
                  <p className="font-medium">{hobby.name}</p>
                  {hobby.description && (
                    <div className="opacity-80 text-[7pt] leading-tight" dangerouslySetInnerHTML={{ __html: parseRichText(hobby.description) }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content - Right Column */}
      <main className="flex-1 p-4 bg-white">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Professional Summary
            </h2>
            <div className="text-gray-700 leading-snug text-[7.5pt] mt-1">
              {renderRichText(data.personalInfo.summary)}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Experience
            </h2>
            <div className="space-y-1.5 mt-1">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-0.5 gap-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[8.5pt]">{exp.position}</h3>
                      <p className="font-medium text-[7.5pt]" style={{ color: colorScheme.secondary }}>{exp.company}</p>
                    </div>
                    <span className="text-gray-600 text-[6.5pt] whitespace-nowrap flex-shrink-0">
                      {formatDate(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="text-gray-700 text-[7.5pt] leading-snug">
                    {renderRichText(exp.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Education
            </h2>
            <div className="space-y-1 mt-1">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-[8.5pt]">{edu.degree} in {edu.field}</h3>
                  <p className="font-medium text-[7.5pt]" style={{ color: colorScheme.secondary }}>{edu.institution}</p>
                  <p className="text-gray-600 text-[6.5pt]">
                    {formatDate(edu.startDate, edu.endDate, edu.current)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {data.publications.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Publications
            </h2>
            <div className="space-y-1 mt-1">
              {data.publications.map((pub) => (
                <div key={pub.id}>
                  <h3 className="font-semibold text-[7.5pt]">{pub.title}</h3>
                  <p className="text-[6.5pt]" style={{ color: colorScheme.secondary }}>
                    {pub.publisher} • {new Date(pub.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  {pub.url && (
                    <a href={pub.url} className="underline text-[6.5pt] break-all" style={{ color: colorScheme.accent }}>
                      {pub.url}
                    </a>
                  )}
                  <div className="text-gray-700 mt-0.5 text-[7.5pt] leading-snug">
                    {renderRichText(pub.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {data.awards.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Certifications
            </h2>
            <div className="space-y-1 mt-1">
              {data.awards.map((award) => (
                <div key={award.id}>
                  <h3 className="font-semibold text-[7.5pt]">{award.title}</h3>
                  <p className="text-[6.5pt]" style={{ color: colorScheme.secondary }}>
                    {award.issuer} • {new Date(award.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  <div className="text-gray-700 mt-0.5 text-[7.5pt] leading-snug">
                    {renderRichText(award.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteering */}
        {data.volunteering.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              Volunteering & Leadership
            </h2>
            <div className="space-y-1 mt-1">
              {data.volunteering.map((vol) => (
                <div key={vol.id}>
                  <h3 className="font-semibold text-[7.5pt]">{vol.role}</h3>
                  <p className="text-[6.5pt]" style={{ color: colorScheme.secondary }}>
                    {vol.organization} • {formatDate(vol.startDate, vol.endDate, vol.current)}
                  </p>
                  <div className="text-gray-700 mt-0.5 text-[7.5pt] leading-snug">
                    {renderRichText(vol.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references.length > 0 && (
          <section className="mb-2 cv-section">
            <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
              {data.sectionTitles.references}
            </h2>
            <div className="space-y-1 mt-1">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-1 rounded-lg border-l-2" style={{ 
                  borderColor: colorScheme.accent,
                  backgroundColor: `${colorScheme.primary}05`
                }}>
                  <h3 className="font-semibold text-[7.5pt]">{ref.name}</h3>
                  <p className="text-[6.5pt]" style={{ color: colorScheme.secondary }}>
                    {ref.title} {ref.company}
                  </p>
                  <p className="text-gray-600 text-[6.5pt]">{ref.relationship}</p>
                  <div className="mt-0.5 space-y-0.5 text-gray-700 text-[6.5pt]">
                    {ref.email && <p className="break-all">{ref.email}</p>}
                    {ref.phone && <p>{ref.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections.map((section) => (
          section.items.length > 0 && (
            <section key={section.id} className="mb-2 cv-section">
              <h2 className="font-bold mb-0.5 pb-0.5 border-b-2 text-[9pt] uppercase tracking-wide" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
                {section.title}
              </h2>
              <div className="space-y-1.5 mt-1">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-0.5 gap-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[8.5pt]">{item.title}</h3>
                        {item.subtitle && (
                          <p className="font-medium text-[7.5pt]" style={{ color: colorScheme.secondary }}>{item.subtitle}</p>
                        )}
                      </div>
                      {(item.startDate || item.endDate) && (
                        <span className="text-gray-600 text-[6.5pt] whitespace-nowrap flex-shrink-0">
                          {formatDate(item.startDate || '', item.endDate || '', item.current || false)}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-700 text-[7.5pt] leading-snug">
                      {renderRichText(item.description)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </main>

      <style>{`
        .cv-section {
          page-break-inside: avoid;
        }
        
        .page-break {
          page-break-before: always;
          border-top: 2px dashed #ccc;
          margin: 2rem 0;
          padding-top: 2rem;
        }
        
        @media print {
          .page-break {
            border: none;
            margin: 0;
            padding: 0;
          }
        }
        
        /* Rich text formatting */
        .creative-template strong {
          font-weight: 700;
        }
        
        .creative-template em {
          font-style: italic;
        }
        
        .creative-template li {
          margin-left: 0;
          padding-left: 0;
          list-style-position: inside;
        }
        
        .creative-template ul {
          list-style-type: disc;
          margin: 0;
          padding: 0;
        }
        
        .creative-template p {
          margin: 0.25rem 0;
        }
        
        .creative-template a {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};