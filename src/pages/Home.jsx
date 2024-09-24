const handleConfirm = async () => {
  const trimmedPolicyName = policyName.trim();

  const configurePermissionsSelectRevised = membersBySection[0].map(
    (member) => member._id
  );
  const configurePermissionsInsertRevised = membersBySection[1].map(
    (member) => member._id
  );
  const configurePermissionsUpdateRevised = membersBySection[2].map(
    (member) => member._id
  );
  const configurePermissionsDeleteRevised = membersBySection[3].map(
    (member) => member._id
  );

  const configurePermissionsSelectExisting = membersBySection[0].map(
    (member) => member._id
  );
  const configurePermissionsInsertExisting = membersBySection[1].map(
    (member) => member._id
  );
  const configurePermissionsUpdateExisting = membersBySection[2].map(
    (member) => member._id
  );
  const configurePermissionsDeleteExisting = membersBySection[3].map(
    (member) => member._id
  );



  const plusData = sectionsPlus.map((section) => ({
    ONname: section.values["dataFeildOption"] || "",
    ONprivacyFilteringAction: section.values["privacyActionOption"] || "",
    ONprivacyFilteringTransformValue: "transformation value",
    ONattributeFilteringAttribute: section.values["attributeOption"] || "",
    ONattributeFilteringValue: section.values["attributeValueOption"],
    ONattributeFilteringAction: section.values["attributeActionOption"] || "",
    ONattributeFilteringTransformationValue: "transformation value",
    rowLevelFilteringBasedonValue:
      section.values["rowLevelFilterinOption"] || "",
  }));

  const postData = {
    policyName: trimmedPolicyName,
    configurePermissionsSelectExisting,
    configurePermissionsSelectRevised,
    configurePermissionsInsertExisting,
    configurePermissionsInsertRevised,
    configurePermissionsUpdateExisting,
    configurePermissionsUpdateRevised,
    configurePermissionsDeleteExisting,
    configurePermissionsDeleteRevised,
    ONdataStore: selectedOptions["dataStoreOptions"],
    ONtableView: selectedOptions["tableOptions"],
    plusData,
  };

  console.log(postData);

  try {
    const response = await fetch(
      `${BASE_URL}/api/data/PolicyManagerText2SQL`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await fetchData();

    const result = await response.json();
    console.log("Policy saved successfully:", result);
    setIsSaveSuccessful(true);
    setSelectedOptions({});
    setPolicyName("");
    setMembersBySection([[], [], [], []]);

    setTimeout(() => {
      setIsSaveSuccessful(false);
      closeModal();
    }, 2000);
    // Clear all dropdown selections and section data
  } catch (error) {
    console.error("Error saving policy:", error);
    setIsSaveSuccessful(false);
  }
};
