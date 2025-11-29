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
      return <ul className="list-none space-y-1 mt-2" dangerouslySetInnerHTML={{ __html: parsed }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: parsed }} />;
  };

  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11pt' }}>
      {/* Sidebar */}
      <aside className="w-1/3 p-8" style={{ backgroundColor: colorScheme.primary, color: 'white' }}>
        <div className="mb-6">
          <h1 className="font-bold mb-1 break-words" style={{ fontSize: '22pt' }}>{data.personalInfo.fullName}</h1>
          <p className="text-[8pt] font-light tracking-widest uppercase opacity-70 mb-2">Curriculum Vitae</p>
          <p className="opacity-90" style={{ fontSize: '12pt' }}>{data.personalInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="font-bold mb-3 pb-2 border-b border-white/30" style={{ fontSize: '14pt' }}>Contact</h2>
          <div className="space-y-2.5" style={{ fontSize: '9pt' }}>
            {data.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-words">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-words">{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold mb-3 pb-2 border-b border-white/30" style={{ fontSize: '14pt' }}>Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1" style={{ fontSize: '9pt' }}>
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
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
          <div className="mb-6">
            <h2 className="font-bold mb-3 pb-2 border-b border-white/30" style={{ fontSize: '14pt' }}>Interests</h2>
            <div className="space-y-1.5" style={{ fontSize: '9pt' }}>
              {data.hobbies.map((hobby) => (
                <div key={hobby.id}>
                  <p className="font-medium">{hobby.name}</p>
                  {hobby.description && (
                    <p className="opacity-80" style={{ fontSize: '8pt' }}>{hobby.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-2" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Professional Summary
            </h2>
            <div className="text-gray-700 leading-relaxed" style={{ fontSize: '11pt' }}>
              {renderRichText(data.personalInfo.summary)}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h3 className="font-semibold" style={{ fontSize: '12pt' }}>{exp.position}</h3>
                      <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '11pt' }}>{exp.company}</p>
                    </div>
                    <span className="text-gray-600 whitespace-nowrap ml-4" style={{ fontSize: '9pt' }}>
                      {formatDate(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                    {renderRichText(exp.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold" style={{ fontSize: '12pt' }}>{edu.degree} in {edu.field}</h3>
                  <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '11pt' }}>{edu.institution}</p>
                  <p className="text-gray-600" style={{ fontSize: '9pt' }}>
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
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Publications
            </h2>
            <div className="space-y-3">
              {data.publications.map((pub) => (
                <div key={pub.id}>
                  <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{pub.title}</h3>
                  <p style={{ color: colorScheme.secondary, fontSize: '10pt' }}>
                    {pub.publisher} • {new Date(pub.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  {pub.url && (
                    <a href={pub.url} className="underline" style={{ color: colorScheme.accent, fontSize: '9pt' }}>
                      {pub.url}
                    </a>
                  )}
                  <div className="text-gray-700 mt-1" style={{ fontSize: '10pt' }}>
                    {renderRichText(pub.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {data.awards.length > 0 && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Awards & Certifications
            </h2>
            <div className="space-y-3">
              {data.awards.map((award) => (
                <div key={award.id}>
                  <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{award.title}</h3>
                  <p style={{ color: colorScheme.secondary, fontSize: '10pt' }}>
                    {award.issuer} • {new Date(award.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  <div className="text-gray-700 mt-1" style={{ fontSize: '10pt' }}>
                    {renderRichText(award.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteering */}
        {data.volunteering.length > 0 && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              Volunteering & Leadership
            </h2>
            <div className="space-y-3">
              {data.volunteering.map((vol) => (
                <div key={vol.id}>
                  <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{vol.role}</h3>
                  <p style={{ color: colorScheme.secondary, fontSize: '10pt' }}>
                    {vol.organization} • {formatDate(vol.startDate, vol.endDate, vol.current)}
                  </p>
                  <div className="text-gray-700 mt-1" style={{ fontSize: '10pt' }}>
                    {renderRichText(vol.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references.length > 0 && (
          <section className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              {data.sectionTitles.references}
            </h2>
            <div className="space-y-2.5">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-3 rounded-lg border-l-4" style={{ 
                  borderColor: colorScheme.accent,
                  backgroundColor: `${colorScheme.primary}05`
                }}>
                  <h3 className="font-semibold" style={{ fontSize: '10pt' }}>{ref.name}</h3>
                  <p style={{ color: colorScheme.secondary, fontSize: '9pt' }}>
                    {ref.title} at {ref.company}
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '8pt' }}>{ref.relationship}</p>
                  <div className="mt-1.5 space-y-0.5 text-gray-700" style={{ fontSize: '8pt' }}>
                    {ref.email && <p>{ref.email}</p>}
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
            <section key={section.id} className="mb-5 cv-section">
              <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h3 className="font-semibold" style={{ fontSize: '12pt' }}>{item.title}</h3>
                        {item.subtitle && (
                          <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '11pt' }}>{item.subtitle}</p>
                        )}
                      </div>
                      {(item.startDate || item.endDate) && (
                        <span className="text-gray-600 whitespace-nowrap ml-4" style={{ fontSize: '9pt' }}>
                          {formatDate(item.startDate || '', item.endDate || '', item.current || false)}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-700" style={{ fontSize: '10pt' }}>
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
      `}</style>
    </div>
  );
};
