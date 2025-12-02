import { CVData } from '@/types/cv';
import { parseRichText, hasListItems } from '@/lib/richTextParser';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ModernTemplateProps {
  data: CVData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
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
    <div className="modern-template bg-white text-gray-900 p-5 w-[210mm] min-h-[297mm] mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5pt' }}>
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
            .modern-template {
              padding: 8mm !important;
              box-shadow: none !important;
              margin: 0 !important;
            }
          }
          @media screen {
            .modern-template {
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
          }
        `}
      </style>

      {/* Header */}
      <header className="mb-2 pb-1.5 border-b-2" style={{ borderColor: colorScheme.primary }}>
        <div className="flex items-start justify-between mb-0.5 gap-2">
          <h1 className="font-bold text-xl flex-1 leading-tight" style={{ color: colorScheme.primary }}>
            {data.personalInfo.fullName}
          </h1>
          <span className="text-[6.5pt] font-light tracking-widest uppercase opacity-65 whitespace-nowrap flex-shrink-0" style={{ color: colorScheme.secondary }}>
            CV
          </span>
        </div>
        <p className="mb-1.5 text-[9pt]" style={{ color: colorScheme.secondary }}>
          {data.personalInfo.title}
        </p>
        {data.personalInfo.additionalInfo && (
          <div className="mb-1.5 text-[7.5pt] text-gray-700 leading-snug">
            {renderRichText(data.personalInfo.additionalInfo)}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 text-[7.5pt]">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 flex-shrink-0" style={{ color: colorScheme.accent }} />
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 flex-shrink-0" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: colorScheme.accent }} />
              <span className="break-words">{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Professional Summary
          </h2>
          <div className="text-gray-700 leading-snug text-[7.5pt]">
            {renderRichText(data.personalInfo.summary)}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Work Experience
          </h2>
          <div className="space-y-1.5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-2.5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
                <div className="absolute left-0 top-0 w-1 h-1 rounded-full -translate-x-[3.5px]" style={{ backgroundColor: colorScheme.accent }} />
                <h3 className="font-semibold text-[8.5pt]">{exp.position}</h3>
                <p className="font-medium text-[7.5pt]" style={{ color: colorScheme.secondary }}>{exp.company}</p>
                <p className="text-gray-600 mb-0.5 text-[6.5pt]">{formatDate(exp.startDate, exp.endDate, exp.current)}</p>
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
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Education
          </h2>
          <div className="space-y-1">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-2.5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
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

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-1">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-0.5">
                  <span className="font-medium text-[7.5pt]">{skill.name}</span>
                  <span className="text-gray-600 text-[6.5pt]">{skill.level}%</span>
                </div>
                <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: colorScheme.accent
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {data.publications.length > 0 && (
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Publications
          </h2>
          <div className="space-y-1">
            {data.publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="font-semibold text-[7.5pt]">{pub.title}</h3>
                <p className="font-medium text-[6.5pt]" style={{ color: colorScheme.secondary }}>
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
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Certifications
          </h2>
          <div className="space-y-1">
            {data.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold text-[7.5pt]">{award.title}</h3>
                <p className="font-medium text-[6.5pt]" style={{ color: colorScheme.secondary }}>
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
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            Volunteering & Leadership
          </h2>
          <div className="space-y-1">
            {data.volunteering.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-semibold text-[7.5pt]">{vol.role}</h3>
                <p className="font-medium text-[6.5pt]" style={{ color: colorScheme.secondary }}>{vol.organization}</p>
                <p className="text-gray-600 mb-0.5 text-[6.5pt]">{formatDate(vol.startDate, vol.endDate, vol.current)}</p>
                <div className="text-gray-700 text-[7.5pt] leading-snug">
                  {renderRichText(vol.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <section className="mb-1.5 cv-section">
            <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
              Hobbies & Interests
            </h2>
            <div className="flex flex-wrap gap-0.5">
              {data.hobbies.map((hobby) => (
                <div key={hobby.id} className="px-1.5 py-0.5 rounded-full text-[6.5pt]" style={{ backgroundColor: `${colorScheme.secondary}20` }}>
                  <span className="font-medium">{hobby.name}</span>
                  {hobby.description && (
                    <span className="text-gray-600">
                      {' - '}
                      <span dangerouslySetInnerHTML={{ __html: parseRichText(hobby.description) }} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* References */}
      {data.references.length > 0 && (
        <section className="mb-1.5 cv-section">
          <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
            {data.sectionTitles.references}
          </h2>
          <div className="grid grid-cols-2 gap-1">
            {data.references.map((ref) => (
              <div key={ref.id} className="p-1 rounded-lg" style={{ backgroundColor: `${colorScheme.primary}10` }}>
                <h3 className="font-semibold text-[7.5pt]">{ref.name}</h3>
                <p className="text-[6.5pt]" style={{ color: colorScheme.secondary }}>{ref.title}</p>
                <p className="text-gray-600 text-[6.5pt]">{ref.company}</p>
                <p className="text-gray-600 mt-0.5 text-[6.5pt]">{ref.relationship}</p>
                <div className="mt-0.5 space-y-0.5 text-[6.5pt]">
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
          <section key={section.id} className="mb-1.5 cv-section">
            <h2 className="font-bold mb-0.5 text-[9pt]" style={{ color: colorScheme.primary }}>
              {section.title}
            </h2>
            <div className="space-y-1.5">
              {section.items.map((item) => (
                <div key={item.id} className="relative pl-2.5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
                  <div className="absolute left-0 top-0 w-1 h-1 rounded-full -translate-x-[3.5px]" style={{ backgroundColor: colorScheme.accent }} />
                  <h3 className="font-semibold text-[8.5pt]">{item.title}</h3>
                  {item.subtitle && (
                    <p className="font-medium text-[7.5pt]" style={{ color: colorScheme.secondary }}>{item.subtitle}</p>
                  )}
                  {(item.startDate || item.endDate) && (
                    <p className="text-gray-600 mb-0.5 text-[6.5pt]">
                      {formatDate(item.startDate || '', item.endDate || '', item.current || false)}
                    </p>
                  )}
                  <div className="text-gray-700 text-[7.5pt] leading-snug">
                    {renderRichText(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      ))}

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
        .modern-template strong {
          font-weight: 700;
        }
        
        .modern-template em {
          font-style: italic;
        }
        
        .modern-template li {
          margin-left: 0;
          padding-left: 0;
          list-style-position: inside;
        }
        
        .modern-template ul {
          list-style-type: disc;
          margin: 0;
          padding: 0;
        }
        
        .modern-template p {
          margin: 0.25rem 0;
        }
        
        .modern-template a {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};