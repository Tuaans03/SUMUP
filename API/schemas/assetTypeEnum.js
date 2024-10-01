const { GraphQLEnumType } = require("graphql");

const AssetTypeEnum = new GraphQLEnumType({
  name: "AssetType",
  values: {
    ERC20: { value: "ERC20" },
    ERC721: { value: "ERC721" },
    ERC1155: { value: "ERC1155" },
  },
});

module.exports = { AssetTypeEnum };
