---
layout: page
title: Contact and Submissions
description: Send Turtle News a tip, pitch, correction, event, or project update.
permalink: /submit/
---

Have a story idea, event, correction, or project to share? Use the form below or email the newsroom.

<form class="submission-form" action="https://formspree.io/f/your-form-id" method="POST">
  <label>
    Name
    <input type="text" name="name" autocomplete="name" required>
  </label>
  <label>
    Email
    <input type="email" name="email" autocomplete="email" required>
  </label>
  <label>
    Submission type
    <select name="type">
      <option>News tip</option>
      <option>Article pitch</option>
      <option>Event listing</option>
      <option>Correction</option>
      <option>App or project update</option>
    </select>
  </label>
  <label>
    Message
    <textarea name="message" rows="7" required></textarea>
  </label>
  <button type="submit">Send submission</button>
</form>

Replace `your-form-id` with a Formspree endpoint, Basin endpoint, or another static-site form service before launch.
