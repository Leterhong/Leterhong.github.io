const { Client } = require('@elastic/elasticsearch');
const elasticClient = new Client({ node: 'http://localhost:9200' });

// 创建Elasticsearch索引
app.post('/create-index', async (req, res) => {
    try {
        const indexName = 'projects'; // 索引名称
        const createIndexResponse = await elasticClient.indices.create({
            index: indexName
        });

        res.json({ message: `索引 '${indexName}' 创建成功` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 执行Elasticsearch搜索
app.get('/search', async (req, res) => {
    const { term } = req.query;

    try {
        const searchResponse = await elasticClient.search({
            index: 'projects', // 你的Elasticsearch索引名称
            body: {
                query: {
                    match: {
                        title: term
                    }
                }
            }
        });

        const results = searchResponse.body.hits.hits.map(hit => hit._source);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
