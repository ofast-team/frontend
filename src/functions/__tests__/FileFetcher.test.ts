import fetchFileContent from '../FileFetcher'
import { Octokit } from '@octokit/rest'

jest.mock('@octokit/rest')

describe('fetchFileContent', () => {
  test('fetches file content from a GitHub repository', async () => {
    const repositoryOwner = 'example-owner'
    const repositoryName = 'example-repo'
    const filePath = 'example.txt'
    const fileContent = 'This is the content of the file.'

    const mockGetContent = jest.fn().mockResolvedValueOnce({
      data: {
        content: Buffer.from(fileContent).toString('base64'),
      },
    })

    const mockOctokit = {
      repos: {
        getContent: mockGetContent,
      },
    } as unknown as Octokit

    ;(Octokit as jest.MockedClass<typeof Octokit>).mockImplementation(
      () => mockOctokit,
    )

    const content = await fetchFileContent(
      repositoryOwner,
      repositoryName,
      filePath,
    )
    expect(content).toBe(fileContent)
    expect(mockGetContent).toHaveBeenCalledWith({
      owner: repositoryOwner,
      repo: repositoryName,
      path: filePath,
    })
  })

  test('handles errors when fetching file from a GitHub repository', async () => {
    const repositoryOwner = 'example-owner'
    const repositoryName = 'example-repo'
    const filePath = 'nonexistent-file.txt'

    const mockGetContent = jest
      .fn()
      .mockRejectedValueOnce(new Error('File not found'))

    const mockOctokit = {
      repos: {
        getContent: mockGetContent,
      },
    } as unknown as Octokit

    ;(Octokit as jest.MockedClass<typeof Octokit>).mockImplementation(
      () => mockOctokit,
    )

    await expect(
      fetchFileContent(repositoryOwner, repositoryName, filePath),
    ).rejects.toThrow('Error fetching file: File not found')

    expect(mockGetContent).toHaveBeenCalledWith({
      owner: repositoryOwner,
      repo: repositoryName,
      path: filePath,
    })
  })
})
