exports.submitCounselling = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      counsellingType,
      message
    } = req.body;

    res.status(200).json({
      success: true,
      message: "Counselling request received successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};