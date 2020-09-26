// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface BuildEvent {
    object_kind: GitlabEventType;
    ref: string;
    tag: boolean;
    before_sha: string;
    sha: string;
    build_id: number;
    build_name: string;
    build_stage: string;
    build_status: string;
    build_started_at?: Date;
    build_finished_at?: Date;
    build_duration?: any;
    build_allow_failure: boolean;
    build_failure_reason: string;
    pipeline_id: number;
    project_id: number;
    project_name: string;
    user: User;
    commit: Commit;
    repository: Repository;
    runner: Runner;
}

interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
}

interface Commit {
    id: number;
    sha: string;
    message: string;
    author_name: string;
    author_email: string;
    status: string;
    duration?: any;
    started_at?: Date;
    finished_at?: Date;
}

interface Repository {
    name: string;
    description: string;
    homepage: string;
    git_ssh_url: string;
    git_http_url: string;
    visibility_level: number;
}

interface Runner {
    active: boolean;
    is_shared: boolean;
    id: number;
    description: string;
}



