import express, {Request, Response} from "express";
import IssueEvent from "../../../../types/Gitlab/IssueEvent";
import {MessageEmbed, WebhookClient} from "discord.js";
import {GitlabEventType} from "../../../../types/Gitlab/GitlabEventType";
import {PushEvent} from "../../../../types/Gitlab/PushEvent";
import {CommentOnCommit} from "../../../../types/Gitlab/CommentOnCommit";
import TimeUtils from "../../../../utils/TimeUtils";
import {CommentOnMergeRequest} from "../../../../types/Gitlab/CommentOnMergeRequest";
import {CommentOnIssue} from "../../../../types/Gitlab/CommentOnIssue";
import {CommentOnCodeSnippet} from "../../../../types/Gitlab/CommentOnCodeSnippet";
import {MergeRequestEvent} from "../../../../types/Gitlab/MergeRequestEvent";
import {WikiPageEvent} from "../../../../types/Gitlab/WikiPageEvent";
import {DeploymentEvent} from "../../../../types/Gitlab/DeploymentEvent";
import {BuildEvent} from "../../../../types/Gitlab/BuildEvent";
import {TagEvent} from "../../../../types/Gitlab/TagEvent";
import {PipelineEvent} from "../../../../types/Gitlab/PipelineEvent";

const router = express.Router();

const embedColor = '#FC6D27'

router.post('/:id/:token', async (req: Request, res: Response) => {
    const object_kind: GitlabEventType = req.body.object_kind
    const payload = req.body

    switch (object_kind) {
        case 'issue':
            issueEvent(res, req.params.id, req.params.token, payload)
            break;
        case 'push':
            pushEvent(res, req.params.id, req.params.token, payload)
            break;
        case "note":
            if (payload.commit)
                commentOnCommitEvent(res, req.params.id, req.params.token, payload)
            else if (payload.merge_request)
                commentOnMergeRequestEvent(res, req.params.id, req.params.token, payload)
            else if (payload.issue)
                commentOnIssueEvent(res, req.params.id, req.params.token, payload)
            else if (payload.snippet)
                commentOnCodeSnippetEvent(res, req.params.id, req.params.token, payload)
            break
        case "merge_request":
            mergeRequestEvent(res, req.params.id, req.params.token, payload)
            break;
        case "wiki_page":
            wikiPageEvent(res, req.params.id, req.params.token, payload)
            break;
        case "deployment":
            deploymentEvent(res, req.params.id, req.params.token, payload)
            break;
        case "build":
            buildEvent(res, req.params.id, req.params.token, payload)
            break;
        case "tag_push":
            tagEvent(res, req.params.id, req.params.token, payload)
            break;
        case "pipeline":
            pipelineEvent(res, req.params.id, req.params.token, payload)
            break;
    }
})

function sendWebhook(res: Response, id: string, token: string, embeds: MessageEmbed[]) {
    const webhook = new WebhookClient(id, token);
    let allSuccess = true;
    for (let embed of embeds) {
        try {
            webhook.send(embed)
        } catch (e) {
            allSuccess = false
        }
    }
    res.sendStatus(allSuccess ? 201 : 406)
}

function issueEvent(res: Response, id: string, token: string, payload: IssueEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`New Issue created`)
    embed.setURL(payload.object_attributes.url)

    if (payload.object_attributes.description)
        embed.addField(payload.object_attributes.title, payload.object_attributes.description, false)

    embed.addField('Status', payload.object_attributes.state, true)

    if (payload.object_attributes.due_date)
        embed.addField('Due Date', payload.object_attributes.due_date, true)

    if (payload.labels?.length)
        embed.addField('Labels', payload.labels.map((i) => `\`${i.title}\``).join('\n'), true)

    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)

    sendWebhook(res, id, token, new Array(embed))
}

function pushEvent(res: Response, id: string, token: string, payload: PushEvent): void {
    const embeds: MessageEmbed[] = []
    for (let commit of payload.commits) {
        const embed = new MessageEmbed().setColor(embedColor);
        embed.setAuthor(payload.user_username, payload.user_avatar, payload.repository.homepage)
        embed.setTitle('New Commit')
        embed.setURL(payload.repository.homepage)
        embed.setTimestamp(commit.timestamp)
        embed.addField('Message', '```\n' + commit.message + '\n```', false)
        embed.addField('Commit ID', `\`${commit.id}\``, false)
        if (commit.added.length > 0)
            embed.addField('Added', commit.added.map((i) => `\`${i}\``).join('\n').substring(0, 1000))
        if (commit.removed.length > 0)
            embed.addField('Removed', commit.removed.map((i) => `\`${i}\``).join('\n').substring(0, 1000))
        if (commit.modified.length > 0)
            embed.addField('Modified', commit.modified.map((i) => `\`${i}\``).join('\n').substring(0, 1000))
        embed.addField('Compare', `[Click here](${payload.project.web_url}/compare/${payload.before}...${payload.after})`, true)
        embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
        embed.setFooter('Branch - ' + payload.project.default_branch)
        embeds.push(embed)
    }
    sendWebhook(res, id, token, embeds)
}

function commentOnCommitEvent(res: Response, id: string, token: string, payload: CommentOnCommit): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`Comment on commit`)
    embed.setURL(payload.object_attributes.url)
    embed.setDescription('```\n' + payload.object_attributes.note + '\n```')
    embed.addField('Commit message', payload.commit.message)
    embed.addField('Commit timestamp', TimeUtils.getTimestamp(new Date(payload.commit.timestamp)), true)
    embed.addField('Commit author', payload.commit.author.name, true)
    embed.addField('Commit ID', `[${payload.commit.id}](${payload.commit.url})`)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function commentOnMergeRequestEvent(res: Response, id: string, token: string, payload: CommentOnMergeRequest): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`Comment on merge request`)
    embed.setURL(payload.object_attributes.url)
    embed.setDescription('```\n' + payload.object_attributes.note + '\n```')
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function commentOnIssueEvent(res: Response, id: string, token: string, payload: CommentOnIssue): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`Comment on issue`)
    embed.setURL(payload.object_attributes.url)
    embed.setDescription('```\n' + payload.object_attributes.note + '\n```')
    embed.addField('Issue state', payload.issue.state, true)
    const issueCreationTime = TimeUtils.getTimestamp(new Date(payload.issue.created_at))
    const issueUpdateTime = TimeUtils.getTimestamp(new Date(payload.issue.updated_at))
    embed.addField('Issue timestamps', `created: ${issueCreationTime}\nupdated: ${issueUpdateTime}`, true)
    if (payload.issue.labels?.length)
        embed.addField('Labels', payload.issue.labels.map((i) => `\`${i.title}\``).join('\n'), true)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function commentOnCodeSnippetEvent(res: Response, id: string, token: string, payload: CommentOnCodeSnippet): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`Comment on code snippet`)
    embed.setURL(payload.object_attributes.url)
    embed.setDescription('```\n' + payload.object_attributes.note + '\n```')
    embed.addField('Snippet Title', payload.snippet.title, true)
    embed.addField('Snippet Content', payload.snippet.content, true)
    const snippetCreationTime = TimeUtils.getTimestamp(new Date(payload.snippet.created_at))
    const snippetUpdateTime = TimeUtils.getTimestamp(new Date(payload.snippet.updated_at))
    embed.addField('Snippet timestamps', `created: ${snippetCreationTime}\nupdated: ${snippetUpdateTime}`, true)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function mergeRequestEvent(res: Response, id: string, token: string, payload: MergeRequestEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.repository.homepage)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setTitle(`Merge Request`)
    embed.setURL(payload.object_attributes.url)
    if (payload.object_attributes.description)
        embed.setDescription('```\n' + payload.object_attributes.description + '\n```')
    embed.addField('Branch', payload.object_attributes.source_branch + ' -> ' + payload.object_attributes.target_branch, true)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function wikiPageEvent(res: Response, id: string, token: string, payload: WikiPageEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.wiki.web_url)
    embed.setTimestamp(new Date())
    embed.setTitle(`Wiki Page`)
    embed.setURL(payload.object_attributes.url)
    if (payload.object_attributes.title)
        embed.addField('Title', payload.object_attributes.title)
    if (payload.object_attributes.content)
        embed.addField('Content', '```\n' + payload.object_attributes.content + '\n```')
    embed.addField('Repository', `[${payload.project.name}](${payload.project.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function deploymentEvent(res: Response, id: string, token: string, payload: DeploymentEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.user.avatar_url)
    embed.setTimestamp(new Date())
    embed.setTitle(`Deployment`)
    embed.setURL(payload.deployable_url)
    if (payload.deployable_id)
        embed.addField('Deployment ID (CI job)', payload.deployable_id, true)
    embed.addField('Status', payload.status, true)
    embed.addField('Environment', payload.environment, true)
    embed.addField('Repository', `[${payload.project.name}](${payload.project.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function buildEvent(res: Response, id: string, token: string, payload: BuildEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.name, payload.user.avatar_url, payload.user.avatar_url)
    embed.setTimestamp(new Date())
    embed.setTitle(`Build Job`)
    embed.setDescription(payload.ref)
    embed.addField('Tag', payload.tag, false)
    if (payload.runner.id)
        embed.addField('Runner ID', payload.runner.id, true)
    if (payload.runner.active)
        embed.addField('Runner is active', payload.runner.active, true)
    if (payload.runner.is_shared)
        embed.addField('Runner is shared', payload.runner.is_shared, true)
    if (payload.runner.description)
        embed.addField('Runner description', payload.runner.description, true)
    if (payload.commit.id)
        embed.addField('Commit ID', payload.commit.id, true)
    if (payload.commit.message)
        embed.addField('Commit message', payload.commit.message, true)
    if (payload.commit.author_name)
        embed.addField('Commit author', payload.commit.author_name, true)
    if (payload.commit.status)
        embed.addField('Commit status', payload.commit.status, true)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function tagEvent(res: Response, id: string, token: string, payload: TagEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user_name, payload.user_avatar, payload.user_avatar)
    embed.setTimestamp(new Date())
    embed.setTitle(`Tag push`)
    embed.setDescription(payload.ref + `\n\nold: ${payload.before}\nnew: ${payload.after}`)
    if (payload.total_commits_count)
        embed.addField('Total commits count', payload.total_commits_count)
    embed.addField('Repository', `[${payload.repository.name}](${payload.repository.homepage})`)
    sendWebhook(res, id, token, new Array(embed))
}

function pipelineEvent(res: Response, id: string, token: string, payload: PipelineEvent): void {
    const embed = new MessageEmbed().setColor(embedColor)
    embed.setAuthor(payload.user.username, payload.user.avatar_url, payload.user.avatar_url)
    embed.setTitle(`Pipeline`)
    embed.setTimestamp(payload.object_attributes.created_at)
    embed.setDescription(payload.object_attributes.ref)
    if (payload.object_attributes.tag)
        embed.addField('Tag', payload.object_attributes.tag, true)
    if (payload.object_attributes.source)
        embed.addField('Source', payload.object_attributes.source, true)
    if (payload.object_attributes.status)
        embed.addField('Status', payload.object_attributes.status, true)
    if (payload.object_attributes.stages && payload.object_attributes.stages)
        embed.addField('Stages', payload.object_attributes.stages.join('\n'), true)
    if (payload.commit && payload.commit.id)
        embed.addField('Commit ID', payload.commit.id, true)
    if (payload.commit && payload.commit.message)
        embed.addField('Commit message', payload.commit.message, true)
    if (payload.commit && payload.commit.author)
        embed.addField('Commit author', payload.commit.author.name, true)
    embed.addField('‎', '***___Builds___***')
    for (let i = 0; i < payload.builds.length; i++) {
        const build = payload.builds[i]
        const description = `
            stage: ${build.stage}
            name: ${build.name}
            status: ${build.status}
            created at: ${build.created_at}
            ${build.runner ? 'runner: ' + build.runner.description : ''}
            `
        embed.addField('Build #' + (i + 1), description, true)
    }
    sendWebhook(res, id, token, new Array(embed))
}

export default router