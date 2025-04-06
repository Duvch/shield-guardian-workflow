
import { DMCATemplate } from "./types";

export const initialTemplates: DMCATemplate[] = [
  {
    id: "dmca-001",
    platform: "YouTube",
    subject: "Copyright Infringement Notification - YouTube",
    template: `DMCA Takedown Notice

To Whom It May Concern at YouTube,

I am writing to notify you that my copyrighted content has been posted to your platform without my authorization.

Content URL: {{contentURL}}

The unauthorized content was posted by: {{contentOwner}}

I have a good faith belief that the use of the material in the manner complained of is not authorized by me, the copyright owner.

The information in this notification is accurate, and under penalty of perjury, I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.

Please remove this content immediately.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-01T10:30:00Z"
  },
  {
    id: "dmca-002",
    platform: "Instagram",
    subject: "Copyright Infringement Notice - Instagram",
    template: `DMCA Takedown Notice

To Whom It May Concern at Instagram,

I am the copyright owner of the content that was posted to your platform without my authorization.

Infringing Content URL: {{contentURL}}

Original Work URL or Description: {{originalWorkDescription}}

I have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

Please act expeditiously to remove the infringing content.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-02T15:45:00Z"
  },
  {
    id: "dmca-003",
    platform: "TikTok",
    subject: "DMCA Takedown Request - TikTok",
    template: `DMCA Takedown Notice

To TikTok Legal Department,

This letter serves as notification under the Digital Millennium Copyright Act that my copyrighted work has been infringed.

The infringing content can be found at: {{contentURL}}

My original work can be found at or described as: {{originalWorkDescription}}

I have a good faith belief that use of the copyrighted materials described above on the infringing web pages is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner, or am authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.

Thank you for your prompt attention to this matter.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-03T11:20:00Z"
  }
];
