const matchSentiment = qualifier => ({
  $match: {
    sentiment: {
      [qualifier]: 0
    }
  }
});

// gets a qualifier (gt, lt, or eq) based on tag
const qualifierFromTag = qualifier => {
  switch(qualifier) {
    case '#positive':
      return '$gt';
    case '#negative':
      return '$lt';
    default:
      return '$eg';
  }
};

// get a random document(s) based on sentiment
const randomDocuments = ({ sentiment, size = 1 }) => {
  const agg = [
    {
      $sample: {
        size
      }
    }
  ];

  if(sentiment) {
    agg.unshift(matchSentiment(qualifierFromTag(sentiment)));
  }

  return agg;
};

module.exports = {
  randomDocuments
};
