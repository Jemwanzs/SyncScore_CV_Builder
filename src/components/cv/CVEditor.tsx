import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RichTextEditor } from './RichTextEditor';
import { SortableSection } from './SortableSection';
import { CVData, SectionType } from '@/types/cv';
import { Plus, Trash2, Copy } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export const CVEditor = ({ data, onChange }: CVEditorProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateSectionTitle = (section: keyof typeof data.sectionTitles, value: string) => {
    onChange({
      ...data,
      sectionTitles: { ...data.sectionTitles, [section]: value }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as string);
      const newIndex = data.sectionOrder.indexOf(over.id as string);

      const newOrder = arrayMove(data.sectionOrder, oldIndex, newIndex);
      onChange({ ...data, sectionOrder: newOrder });
    }
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...data.sectionOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onChange({ ...data, sectionOrder: newOrder });
  };

  const moveSectionDown = (index: number) => {
    if (index === data.sectionOrder.length - 1) return;
    const newOrder = [...data.sectionOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onChange({ ...data, sectionOrder: newOrder });
  };

  // Experience functions
  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const duplicateExperience = (id: string) => {
    const exp = data.experience.find(e => e.id === id);
    if (exp) {
      onChange({
        ...data,
        experience: [...data.experience, { ...exp, id: Date.now().toString() }]
      });
    }
  };

  // Education functions
  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: ''
      }]
    });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const duplicateEducation = (id: string) => {
    const edu = data.education.find(e => e.id === id);
    if (edu) {
      onChange({
        ...data,
        education: [...data.education, { ...edu, id: Date.now().toString() }]
      });
    }
  };

  // Skills functions
  const addSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, {
        id: Date.now().toString(),
        name: '',
        level: 50
      }]
    });
  };

  const updateSkill = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      skills: data.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(skill => skill.id !== id)
    });
  };

  const duplicateSkill = (id: string) => {
    const skill = data.skills.find(s => s.id === id);
    if (skill) {
      onChange({
        ...data,
        skills: [...data.skills, { ...skill, id: Date.now().toString() }]
      });
    }
  };

  // Publications functions
  const addPublication = () => {
    onChange({
      ...data,
      publications: [...data.publications, {
        id: Date.now().toString(),
        title: '',
        publisher: '',
        date: '',
        url: '',
        description: ''
      }]
    });
  };

  const updatePublication = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      publications: data.publications.map(pub =>
        pub.id === id ? { ...pub, [field]: value } : pub
      )
    });
  };

  const removePublication = (id: string) => {
    onChange({
      ...data,
      publications: data.publications.filter(pub => pub.id !== id)
    });
  };

  const duplicatePublication = (id: string) => {
    const pub = data.publications.find(p => p.id === id);
    if (pub) {
      onChange({
        ...data,
        publications: [...data.publications, { ...pub, id: Date.now().toString() }]
      });
    }
  };

  // Awards functions
  const addAward = () => {
    onChange({
      ...data,
      awards: [...data.awards, {
        id: Date.now().toString(),
        title: '',
        issuer: '',
        date: '',
        description: ''
      }]
    });
  };

  const updateAward = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      awards: data.awards.map(award =>
        award.id === id ? { ...award, [field]: value } : award
      )
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      awards: data.awards.filter(award => award.id !== id)
    });
  };

  const duplicateAward = (id: string) => {
    const award = data.awards.find(a => a.id === id);
    if (award) {
      onChange({
        ...data,
        awards: [...data.awards, { ...award, id: Date.now().toString() }]
      });
    }
  };

  // Volunteering functions
  const addVolunteering = () => {
    onChange({
      ...data,
      volunteering: [...data.volunteering, {
        id: Date.now().toString(),
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    });
  };

  const updateVolunteering = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      volunteering: data.volunteering.map(vol =>
        vol.id === id ? { ...vol, [field]: value } : vol
      )
    });
  };

  const removeVolunteering = (id: string) => {
    onChange({
      ...data,
      volunteering: data.volunteering.filter(vol => vol.id !== id)
    });
  };

  const duplicateVolunteering = (id: string) => {
    const vol = data.volunteering.find(v => v.id === id);
    if (vol) {
      onChange({
        ...data,
        volunteering: [...data.volunteering, { ...vol, id: Date.now().toString() }]
      });
    }
  };

  // Hobbies functions
  const addHobby = () => {
    onChange({
      ...data,
      hobbies: [...data.hobbies, {
        id: Date.now().toString(),
        name: '',
        description: ''
      }]
    });
  };

  const updateHobby = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      hobbies: data.hobbies.map(hobby =>
        hobby.id === id ? { ...hobby, [field]: value } : hobby
      )
    });
  };

  const removeHobby = (id: string) => {
    onChange({
      ...data,
      hobbies: data.hobbies.filter(hobby => hobby.id !== id)
    });
  };

  const duplicateHobby = (id: string) => {
    const hobby = data.hobbies.find(h => h.id === id);
    if (hobby) {
      onChange({
        ...data,
        hobbies: [...data.hobbies, { ...hobby, id: Date.now().toString() }]
      });
    }
  };

  // References functions
  const addReference = () => {
    onChange({
      ...data,
      references: [...data.references, {
        id: Date.now().toString(),
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        relationship: ''
      }]
    });
  };

  const updateReference = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      references: data.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    });
  };

  const removeReference = (id: string) => {
    onChange({
      ...data,
      references: data.references.filter(ref => ref.id !== id)
    });
  };

  const duplicateReference = (id: string) => {
    const ref = data.references.find(r => r.id === id);
    if (ref) {
      onChange({
        ...data,
        references: [...data.references, { ...ref, id: Date.now().toString() }]
      });
    }
  };

  // Custom sections functions
  const addCustomSection = () => {
    const newSection: import('@/types/cv').CustomSection = {
      id: Date.now().toString(),
      title: 'New Section',
      items: [],
    };
    onChange({ 
      ...data, 
      customSections: [...data.customSections, newSection],
      sectionOrder: [...data.sectionOrder, newSection.id]
    });
  };

  const duplicateCustomSection = (id: string) => {
    const section = data.customSections.find(s => s.id === id);
    if (section) {
      const newSection = { 
        ...section, 
        id: Date.now().toString(),
        items: section.items.map(item => ({ ...item, id: Date.now().toString() + Math.random() }))
      };
      onChange({ 
        ...data, 
        customSections: [...data.customSections, newSection],
        sectionOrder: [...data.sectionOrder, newSection.id]
      });
    }
  };

  const deleteCustomSection = (id: string) => {
    onChange({ 
      ...data, 
      customSections: data.customSections.filter(s => s.id !== id),
      sectionOrder: data.sectionOrder.filter(sId => sId !== id)
    });
  };

  const updateCustomSectionTitle = (id: string, title: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s =>
        s.id === id ? { ...s, title } : s
      ),
    });
  };

  const addCustomSectionItem = (sectionId: string) => {
    const newItem: import('@/types/cv').CustomSectionItem = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange({
      ...data,
      customSections: data.customSections.map(s =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      ),
    });
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, field: keyof import('@/types/cv').CustomSectionItem, value: any) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : s
      ),
    });
  };

  const deleteCustomSectionItem = (sectionId: string, itemId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s =>
        s.id === sectionId ? { ...s, items: s.items.filter(item => item.id !== itemId) } : s
      ),
    });
  };

  const duplicateCustomSectionItem = (sectionId: string, itemId: string) => {
    const section = data.customSections.find(s => s.id === sectionId);
    if (section) {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        const newItem = { ...item, id: Date.now().toString() };
        onChange({
          ...data,
          customSections: data.customSections.map(s =>
            s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
          ),
        });
      }
    }
  };

  const renderSectionContent = (sectionType: SectionType | string) => {
    switch (sectionType) {
      case 'experience':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        />
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        />
                        <Input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                        />
                        <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                      </div>
                      <RichTextEditor
                        value={exp.description}
                        onChange={(value) => updateExperience(exp.id, 'description', value)}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateExperience(exp.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(exp.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        />
                        <Input
                          placeholder="Field of Study"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          type="month"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                        <Input
                          type="month"
                          placeholder="End Date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                        />
                        <Input
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`edu-current-${edu.id}`}
                          checked={edu.current}
                          onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked)}
                        />
                        <Label htmlFor={`edu-current-${edu.id}`}>Currently studying</Label>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateEducation(edu.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(edu.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4">
                  <Input
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex-1">
                    <Slider
                      value={[skill.level]}
                      onValueChange={(value) => updateSkill(skill.id, 'level', value[0])}
                      max={100}
                      step={5}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{skill.level}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => duplicateSkill(skill.id)}
                    title="Duplicate"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkill(skill.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'publications':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addPublication} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.publications.map((pub) => (
                <div key={pub.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Publication Title"
                        value={pub.title}
                        onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Publisher"
                          value={pub.publisher}
                          onChange={(e) => updatePublication(pub.id, 'publisher', e.target.value)}
                        />
                        <Input
                          type="month"
                          placeholder="Date"
                          value={pub.date}
                          onChange={(e) => updatePublication(pub.id, 'date', e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="URL (optional)"
                        value={pub.url}
                        onChange={(e) => updatePublication(pub.id, 'url', e.target.value)}
                      />
                      <RichTextEditor
                        value={pub.description}
                        onChange={(value) => updatePublication(pub.id, 'description', value)}
                        placeholder="Describe the publication..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicatePublication(pub.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePublication(pub.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addAward} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.awards.map((award) => (
                <div key={award.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Award/Certification Title"
                        value={award.title}
                        onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Issuer"
                          value={award.issuer}
                          onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                        />
                        <Input
                          type="month"
                          placeholder="Date"
                          value={award.date}
                          onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                        />
                      </div>
                      <RichTextEditor
                        value={award.description}
                        onChange={(value) => updateAward(award.id, 'description', value)}
                        placeholder="Describe the award..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateAward(award.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAward(award.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'volunteering':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addVolunteering} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.volunteering.map((vol) => (
                <div key={vol.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Organization"
                          value={vol.organization}
                          onChange={(e) => updateVolunteering(vol.id, 'organization', e.target.value)}
                        />
                        <Input
                          placeholder="Role"
                          value={vol.role}
                          onChange={(e) => updateVolunteering(vol.id, 'role', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="month"
                          placeholder="Start Date"
                          value={vol.startDate}
                          onChange={(e) => updateVolunteering(vol.id, 'startDate', e.target.value)}
                        />
                        <Input
                          type="month"
                          placeholder="End Date"
                          value={vol.endDate}
                          onChange={(e) => updateVolunteering(vol.id, 'endDate', e.target.value)}
                          disabled={vol.current}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`vol-current-${vol.id}`}
                          checked={vol.current}
                          onCheckedChange={(checked) => updateVolunteering(vol.id, 'current', checked)}
                        />
                        <Label htmlFor={`vol-current-${vol.id}`}>Currently active</Label>
                      </div>
                      <RichTextEditor
                        value={vol.description}
                        onChange={(value) => updateVolunteering(vol.id, 'description', value)}
                        placeholder="Describe your contributions..."
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateVolunteering(vol.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVolunteering(vol.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'hobbies':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addHobby} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {data.hobbies.map((hobby) => (
                <div key={hobby.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Hobby/Interest Name"
                        value={hobby.name}
                        onChange={(e) => updateHobby(hobby.id, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Description (optional)"
                        value={hobby.description || ''}
                        onChange={(e) => updateHobby(hobby.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateHobby(hobby.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHobby(hobby.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'references':
        return (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={addReference} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Reference Name"
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Title"
                          value={ref.title}
                          onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                        />
                        <Input
                          placeholder="Company"
                          value={ref.company}
                          onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Email"
                          type="email"
                          value={ref.email}
                          onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                        />
                        <Input
                          placeholder="Phone"
                          value={ref.phone}
                          onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="Relationship (e.g., Former Manager)"
                        value={ref.relationship}
                        onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateReference(ref.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReference(ref.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Custom section
        const customSection = data.customSections.find(s => s.id === sectionType);
        if (!customSection) return null;

        return (
          <div>
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => duplicateCustomSection(customSection.id)}
                title="Duplicate Section"
                className="ml-auto"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Section
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteCustomSection(customSection.id)}
                title="Delete Section"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Section
              </Button>
            </div>

            <Button 
              onClick={() => addCustomSectionItem(customSection.id)} 
              size="sm" 
              variant="outline"
              className="w-full mb-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>

            <div className="space-y-4">
              {customSection.items.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <Input
                        value={item.title}
                        onChange={(e) => updateCustomSectionItem(customSection.id, item.id, 'title', e.target.value)}
                        placeholder="Item Title"
                      />
                      
                      <Input
                        value={item.subtitle || ''}
                        onChange={(e) => updateCustomSectionItem(customSection.id, item.id, 'subtitle', e.target.value)}
                        placeholder="Subtitle (optional)"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="month"
                          value={item.startDate || ''}
                          onChange={(e) => updateCustomSectionItem(customSection.id, item.id, 'startDate', e.target.value)}
                          placeholder="Start Date (optional)"
                        />
                        <Input
                          type="month"
                          value={item.endDate || ''}
                          onChange={(e) => updateCustomSectionItem(customSection.id, item.id, 'endDate', e.target.value)}
                          disabled={item.current}
                          placeholder="End Date"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`custom-current-${item.id}`}
                          checked={item.current || false}
                          onCheckedChange={(checked) => updateCustomSectionItem(customSection.id, item.id, 'current', checked)}
                        />
                        <Label htmlFor={`custom-current-${item.id}`}>Current / No End Date</Label>
                      </div>
                      
                      <RichTextEditor
                        value={item.description}
                        onChange={(value) => updateCustomSectionItem(customSection.id, item.id, 'description', value)}
                        placeholder="Description..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateCustomSectionItem(customSection.id, item.id)}
                        title="Duplicate Item"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCustomSectionItem(customSection.id, item.id)}
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <RichTextEditor
              value={data.personalInfo.summary}
              onChange={(value) => updatePersonalInfo('summary', value)}
              placeholder="Brief professional summary..."
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Sortable Sections */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
          {data.sectionOrder.map((sectionId, index) => {
            const isCustomSection = !['experience', 'education', 'skills', 'publications', 'awards', 'volunteering', 'hobbies', 'references'].includes(sectionId);
            const sectionTitle = isCustomSection 
              ? data.customSections.find(s => s.id === sectionId)?.title || 'Custom Section'
              : data.sectionTitles[sectionId as keyof typeof data.sectionTitles];

            return (
              <SortableSection
                key={sectionId}
                id={sectionId}
                title={sectionTitle}
                onTitleChange={(value) => {
                  if (isCustomSection) {
                    updateCustomSectionTitle(sectionId, value);
                  } else {
                    updateSectionTitle(sectionId as keyof typeof data.sectionTitles, value);
                  }
                }}
                onMoveUp={() => moveSectionUp(index)}
                onMoveDown={() => moveSectionDown(index)}
                canMoveUp={index > 0}
                canMoveDown={index < data.sectionOrder.length - 1}
              >
                {renderSectionContent(sectionId as SectionType)}
              </SortableSection>
            );
          })}
        </SortableContext>
      </DndContext>

      {/* Add Custom Section Button */}
      <Card className="p-6">
        <Button onClick={addCustomSection} size="lg" className="w-full">
          <Plus className="h-5 w-5 mr-2" />
          Add New Custom Section
        </Button>
      </Card>
    </div>
  );
};
