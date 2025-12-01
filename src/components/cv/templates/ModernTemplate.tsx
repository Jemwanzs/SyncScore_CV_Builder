{/*
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
      return <ul className="list-none space-y-1 mt-2" dangerouslySetInnerHTML={{ __html: parsed }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: parsed }} />;
  };

  return (
    <div className="bg-white text-gray-900 p-12 w-[210mm] min-h-[297mm] mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11pt' }}>
      //Header//
      <header className="mb-6 pb-5 border-b-4" style={{ borderColor: colorScheme.primary }}>
        <div className="flex items-baseline justify-between mb-2">
          <h1 className="font-bold" style={{ color: colorScheme.primary, fontSize: '28pt' }}>
            {data.personalInfo.fullName}
          </h1>
          <span className="text-xs font-light tracking-widest uppercase opacity-60" style={{ color: colorScheme.secondary }}>
            CV
          </span>
        </div>
        <p className="mb-3" style={{ color: colorScheme.secondary, fontSize: '14pt' }}>
          {data.personalInfo.title}
        </p>
        <div className="flex flex-wrap gap-4" style={{ fontSize: '10pt' }}>
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      //Summary//
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

      //Experience//
      {data.experience.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
                <div className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full -translate-x-[6px]" style={{ backgroundColor: colorScheme.accent }} />
                <h3 className="font-semibold" style={{ fontSize: '12pt' }}>{exp.position}</h3>
                <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '11pt' }}>{exp.company}</p>
                <p className="text-gray-600 mb-1.5" style={{ fontSize: '9pt' }}>{formatDate(exp.startDate, exp.endDate, exp.current)}</p>
                <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                  {renderRichText(exp.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      //Education//
      {data.education.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
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

      //Skills//
      {data.skills.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium" style={{ fontSize: '10pt' }}>{skill.name}</span>
                  <span className="text-gray-600" style={{ fontSize: '9pt' }}>{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
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

      //Publications//
      {data.publications.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Publications
          </h2>
          <div className="space-y-3">
            {data.publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{pub.title}</h3>
                <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '10pt' }}>
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

      //Awards//
      {data.awards.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Awards & Certifications
          </h2>
          <div className="space-y-3">
            {data.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{award.title}</h3>
                <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '10pt' }}>
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

      //Volunteering//
      {data.volunteering.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Volunteering & Leadership
          </h2>
          <div className="space-y-3">
            {data.volunteering.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>{vol.role}</h3>
                <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '10pt' }}>{vol.organization}</p>
                <p className="text-gray-600 mb-1.5" style={{ fontSize: '9pt' }}>{formatDate(vol.startDate, vol.endDate, vol.current)}</p>
                <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                  {renderRichText(vol.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      //Hobbies//
      {data.hobbies.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            Hobbies & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby) => (
              <div key={hobby.id} className="px-3 py-1.5 rounded-full" style={{ backgroundColor: `${colorScheme.secondary}20`, fontSize: '10pt' }}>
                <span className="font-medium">{hobby.name}</span>
                {hobby.description && <span className="text-gray-600"> - {hobby.description}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      //References//
      {data.references.length > 0 && (
        <section className="mb-5 cv-section">
          <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
            {data.sectionTitles.references}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.references.map((ref) => (
              <div key={ref.id} className="p-3 rounded-lg" style={{ backgroundColor: `${colorScheme.primary}10` }}>
                <h3 className="font-semibold" style={{ fontSize: '10pt' }}>{ref.name}</h3>
                <p style={{ color: colorScheme.secondary, fontSize: '9pt' }}>{ref.title}</p>
                <p className="text-gray-600" style={{ fontSize: '9pt' }}>{ref.company}</p>
                <p className="text-gray-600 mt-1" style={{ fontSize: '8pt' }}>{ref.relationship}</p>
                <div className="mt-1.5 space-y-0.5" style={{ fontSize: '8pt' }}>
                  {ref.email && <p>{ref.email}</p>}
                  {ref.phone && <p>{ref.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      //Custom Sections//
      {data.customSections.map((section) => (
        section.items.length > 0 && (
          <section key={section.id} className="mb-5 cv-section">
            <h2 className="font-bold mb-3" style={{ color: colorScheme.primary, fontSize: '16pt' }}>
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="relative pl-5 border-l-2" style={{ borderColor: colorScheme.secondary }}>
                  <div className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full -translate-x-[6px]" style={{ backgroundColor: colorScheme.accent }} />
                  <h3 className="font-semibold" style={{ fontSize: '12pt' }}>{item.title}</h3>
                  {item.subtitle && (
                    <p className="font-medium" style={{ color: colorScheme.secondary, fontSize: '11pt' }}>{item.subtitle}</p>
                  )}
                  {(item.startDate || item.endDate) && (
                    <p className="text-gray-600 mb-1.5" style={{ fontSize: '9pt' }}>
                      {formatDate(item.startDate || '', item.endDate || '', item.current || false)}
                    </p>
                  )}
                  <div className="text-gray-700" style={{ fontSize: '10pt' }}>
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
      `}</style>
    </div>
  );
};

*/}


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
    const endDate = current
      ? 'Present'
      : end
      ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '';
    return `${startDate} - ${endDate}`;
  };

  const renderRichText = (text: string) => {
    const parsed = parseRichText(text);
    const isList = hasListItems(text);

    if (isList) {
      return (
        <ul
          className="list-none space-y-1 mt-2"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: parsed }} />;
  };

  return (
    <div
      className="bg-white text-gray-900 p-12 w-[210mm] min-h-[297mm] mx-auto"
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11pt',
        lineHeight: 1.45,
      }}
    >
      {/* HEADER */}
      <header
        className="mb-8 pb-5 border-b-4"
        style={{ borderColor: colorScheme.primary }}
      >
        <div className="flex items-end justify-between mb-1.5">
          <h1
            className="font-extrabold tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '28pt' }}
          >
            {data.personalInfo.fullName}
          </h1>
          <span
            className="text-xs tracking-widest uppercase opacity-60"
            style={{ color: colorScheme.secondary }}
          >
            CV
          </span>
        </div>

        <p
          className="mt-1 mb-4 font-medium"
          style={{ color: colorScheme.secondary, fontSize: '14pt' }}
        >
          {data.personalInfo.title}
        </p>

        {/* CONTACT ROW */}
        <div className="flex flex-wrap gap-5" style={{ fontSize: '10pt' }}>
          {data.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}

          {data.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}

          {data.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" style={{ color: colorScheme.accent }} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.personalInfo.summary && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-2 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Professional Summary
          </h2>
          <div className="text-gray-700" style={{ fontSize: '11pt' }}>
            {renderRichText(data.personalInfo.summary)}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Work Experience
          </h2>

          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-5 border-l-2"
                style={{ borderColor: colorScheme.secondary }}
              >
                <div
                  className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[6px]"
                  style={{ backgroundColor: colorScheme.accent }}
                />

                <h3 className="font-semibold" style={{ fontSize: '12pt' }}>
                  {exp.position}
                </h3>
                <p
                  className="font-medium"
                  style={{ color: colorScheme.secondary, fontSize: '11pt' }}
                >
                  {exp.company}
                </p>

                <p className="text-gray-600 mb-2" style={{ fontSize: '9pt' }}>
                  {formatDate(exp.startDate, exp.endDate, exp.current)}
                </p>

                <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                  {renderRichText(exp.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="pl-5 border-l-2"
                style={{ borderColor: colorScheme.secondary }}
              >
                <h3 className="font-semibold" style={{ fontSize: '12pt' }}>
                  {edu.degree} in {edu.field}
                </h3>

                <p
                  className="font-medium"
                  style={{ color: colorScheme.secondary, fontSize: '11pt' }}
                >
                  {edu.institution}
                </p>

                <p className="text-gray-600" style={{ fontSize: '9pt' }}>
                  {formatDate(edu.startDate, edu.endDate, edu.current)}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium" style={{ fontSize: '10pt' }}>
                    {skill.name}
                  </span>
                  <span
                    className="text-gray-600"
                    style={{ fontSize: '9pt' }}
                  >
                    {skill.level}%
                  </span>
                </div>

                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: colorScheme.accent,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PUBLICATIONS */}
      {data.publications.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Publications
          </h2>

          <div className="space-y-4">
            {data.publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>
                  {pub.title}
                </h3>

                <p
                  className="font-medium"
                  style={{ color: colorScheme.secondary, fontSize: '10pt' }}
                >
                  {pub.publisher} •{' '}
                  {new Date(pub.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                {pub.url && (
                  <a
                    href={pub.url}
                    className="underline"
                    style={{ color: colorScheme.accent, fontSize: '9pt' }}
                  >
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

      {/* AWARDS */}
      {data.awards.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Awards & Certifications
          </h2>

          <div className="space-y-4">
            {data.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>
                  {award.title}
                </h3>

                <p
                  className="font-medium"
                  style={{ color: colorScheme.secondary, fontSize: '10pt' }}
                >
                  {award.issuer} •{' '}
                  {new Date(award.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                <div className="text-gray-700 mt-1" style={{ fontSize: '10pt' }}>
                  {renderRichText(award.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VOLUNTEERING */}
      {data.volunteering.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Volunteering & Leadership
          </h2>

          <div className="space-y-4">
            {data.volunteering.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-semibold" style={{ fontSize: '11pt' }}>
                  {vol.role}
                </h3>
                <p
                  className="font-medium"
                  style={{ color: colorScheme.secondary, fontSize: '10pt' }}
                >
                  {vol.organization}
                </p>

                <p className="text-gray-600 mb-1.5" style={{ fontSize: '9pt' }}>
                  {formatDate(vol.startDate, vol.endDate, vol.current)}
                </p>

                <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                  {renderRichText(vol.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HOBBIES */}
      {data.hobbies.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            Hobbies & Interests
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby) => (
              <div
                key={hobby.id}
                className="px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: `${colorScheme.secondary}20`,
                  fontSize: '10pt',
                }}
              >
                <span className="font-medium">{hobby.name}</span>
                {hobby.description && (
                  <span className="text-gray-600"> - {hobby.description}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REFERENCES */}
      {data.references.length > 0 && (
        <section className="mb-6 cv-section">
          <h2
            className="font-bold mb-3 tracking-tight"
            style={{ color: colorScheme.primary, fontSize: '16pt' }}
          >
            {data.sectionTitles.references}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {data.references.map((ref) => (
              <div
                key={ref.id}
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${colorScheme.primary}10` }}
              >
                <h3 className="font-semibold" style={{ fontSize: '10pt' }}>
                  {ref.name}
                </h3>
                <p style={{ color: colorScheme.secondary, fontSize: '9pt' }}>
                  {ref.title}
                </p>

                <p className="text-gray-600" style={{ fontSize: '9pt' }}>
                  {ref.company}
                </p>

                <p className="text-gray-600 mt-1" style={{ fontSize: '8pt' }}>
                  {ref.relationship}
                </p>

                <div className="mt-1.5 space-y-0.5" style={{ fontSize: '8pt' }}>
                  {ref.email && <p>{ref.email}</p>}
                  {ref.phone && <p>{ref.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CUSTOM SECTIONS */}
      {data.customSections.map(
        (section) =>
          section.items.length > 0 && (
            <section key={section.id} className="mb-6 cv-section">
              <h2
                className="font-bold mb-3 tracking-tight"
                style={{ color: colorScheme.primary, fontSize: '16pt' }}
              >
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="relative pl-5 border-l-2"
                    style={{ borderColor: colorScheme.secondary }}
                  >
                    <div
                      className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[6px]"
                      style={{ backgroundColor: colorScheme.accent }}
                    />

                    <h3 className="font-semibold" style={{ fontSize: '12pt' }}>
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p
                        className="font-medium"
                        style={{ color: colorScheme.secondary, fontSize: '11pt' }}
                      >
                        {item.subtitle}
                      </p>
                    )}

                    {(item.startDate || item.endDate) && (
                      <p className="text-gray-600 mb-1" style={{ fontSize: '9pt' }}>
                        {formatDate(
                          item.startDate || '',
                          item.endDate || '',
                          item.current || false
                        )}
                      </p>
                    )}

                    <div className="text-gray-700" style={{ fontSize: '10pt' }}>
                      {renderRichText(item.description)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
      )}

      {/* STYLES */}
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