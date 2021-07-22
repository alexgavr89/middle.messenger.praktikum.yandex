export default `
<t-avatar></t-avatar>
<div class="chat__info">
  <span class="info__name">{{ title }}</span>
  <span class="info__last-message">{{ last_message_content }}</span>
</div>
<div class="chat__message-info">
  <span>{{ unread_count_str }}</span>
</div>
`;
