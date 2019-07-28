export const state = () => ({
  githubProjects: []
})

export const mutations = {
  updateGithubProjects: (state, payload) => {
    state.githubProjects = payload
  }
}

export const actions = {
  async getGithubProjects ({ state, commit }) {
    if (state.githubProjects.length) return

    try {
      let githubProjects = await fetch(
        'https://api.github.com/users/joshdev1205/repos?page=1&per_page=100'
      ).then(res => res.json())

      githubProjects = githubProjects
        .filter(project => project.fork === false)
        .map(({ id, name, description, stargazers_count, homepage, html }) => ({ id, name, description, stargazers_count, homepage, html }))

      commit('updateGithubProjects', githubProjects)
    } catch (error) {
      console.log(error)
    }

  }
}
