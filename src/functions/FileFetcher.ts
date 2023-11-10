import { Buffer } from 'buffer'
import { Octokit } from '@octokit/rest'

async function fetchFileContent(
  repositoryOwner: string,
  repositoryName: string,
  filePath: string,
): Promise<string> {
  const octokit = new Octokit()

  try {
    const response = await octokit.repos.getContent({
      owner: repositoryOwner,
      repo: repositoryName,
      path: filePath,
    })

    if (
      response.data &&
      typeof response.data === 'object' &&
      'content' in response.data
    ) {
      const fileContent = Buffer.from(
        response.data.content,
        'base64',
      ).toString()
      return fileContent
    } else {
      throw new Error('File content not found')
    }
  } catch (error) {
    throw new Error(`Error fetching file: ${(error as Error).message}`)
  }
}

export default fetchFileContent
