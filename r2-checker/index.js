export default {
  async fetch(request, env) {
    let listed = await env.PIC.list({ prefix: "vocabulary-mp3/" });
    return new Response(JSON.stringify(listed.objects.map(o => o.key)));
  }
}
