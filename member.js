function skillsMember() {
  const member = {
    name: process.env.USER || 'anonymous',
    skills: [],
    add(skill) {
      if (!skill) return this.skills;
      if (!this.skills.includes(skill)) this.skills.push(skill);
      return this.skills;
    },
    remove(skill) {
      const idx = this.skills.indexOf(skill);
      if (idx >= 0) this.skills.splice(idx, 1);
      return this.skills;
    },
    list() {
      return [...this.skills];
    },
    has(skill) {
      return this.skills.includes(skill);
    }
  };

  return member;
}
    

module.exports = skillsMember;