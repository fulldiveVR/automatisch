// https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html#release-events

export default {
  object_kind: 'release',
  id: 1,
  created_at: '2020-11-02 12:55:12 UTC',
  description: 'v1.1 has been released',
  name: 'v1.1',
  released_at: '2020-11-02 12:55:12 UTC',
  tag: 'v1.1',
  project: {
    id: 2,
    name: 'release-webhook-example',
    description: '',
    web_url: 'https://example.com/gitlab-org/release-webhook-example',
    avatar_url: null,
    git_ssh_url: 'ssh://git@example.com/gitlab-org/release-webhook-example.git',
    git_http_url: 'https://example.com/gitlab-org/release-webhook-example.git',
    namespace: 'Gitlab',
    visibility_level: 0,
    path_with_namespace: 'gitlab-org/release-webhook-example',
    default_branch: 'master',
    ci_config_path: null,
    homepage: 'https://example.com/gitlab-org/release-webhook-example',
    url: 'ssh://git@example.com/gitlab-org/release-webhook-example.git',
    ssh_url: 'ssh://git@example.com/gitlab-org/release-webhook-example.git',
    http_url: 'https://example.com/gitlab-org/release-webhook-example.git',
  },
  url: 'https://example.com/gitlab-org/release-webhook-example/-/releases/v1.1',
  action: 'create',
  assets: {
    count: 5,
    links: [
      {
        id: 1,
        external: true, // deprecated in GitLab 15.9, will be removed in GitLab 16.0.
        link_type: 'other',
        name: 'Changelog',
        url: 'https://example.net/changelog',
      },
    ],
    sources: [
      {
        format: 'zip',
        url: 'https://example.com/gitlab-org/release-webhook-example/-/archive/v1.1/release-webhook-example-v1.1.zip',
      },
      {
        format: 'tar.gz',
        url: 'https://example.com/gitlab-org/release-webhook-example/-/archive/v1.1/release-webhook-example-v1.1.tar.gz',
      },
      {
        format: 'tar.bz2',
        url: 'https://example.com/gitlab-org/release-webhook-example/-/archive/v1.1/release-webhook-example-v1.1.tar.bz2',
      },
      {
        format: 'tar',
        url: 'https://example.com/gitlab-org/release-webhook-example/-/archive/v1.1/release-webhook-example-v1.1.tar',
      },
    ],
  },
  commit: {
    id: 'ee0a3fb31ac16e11b9dbb596ad16d4af654d08f8',
    message: 'Release v1.1',
    title: 'Release v1.1',
    timestamp: '2020-10-31T14:58:32+11:00',
    url: 'https://example.com/gitlab-org/release-webhook-example/-/commit/ee0a3fb31ac16e11b9dbb596ad16d4af654d08f8',
    author: {
      name: 'Example User',
      email: 'user@example.com',
    },
  },
};
