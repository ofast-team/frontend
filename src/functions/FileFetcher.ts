import { Buffer } from 'buffer'
import { Octokit } from '@octokit/rest'

/*
 * @brief function to fetch the content of a file in a public GitHub repository
 *
 * @param repositoryOwner: owner of the repository
 * @param repositoryName: name of the repository
 * @param filePath: path to the file relative to the root of the repository
 *
 * @returns a promsied string containing the contents of the file
 *
 * @throws if the file is not found
 */
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
    throw new Error(`Error fetching file: ${(error as Error).message}
      repositoryOwner: ${repositoryOwner}
      repositoryName: ${repositoryName}
      filePath: ${filePath}
    `)
  }
}

export default fetchFileContent
