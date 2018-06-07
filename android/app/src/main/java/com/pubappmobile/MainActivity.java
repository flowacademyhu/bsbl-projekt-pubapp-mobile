package com.pubappmobile;

import com.reactnativenavigation.controllers.SplashActivity;

import android.graphics.Typeface;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;
import android.util.TypedValue;
import android.widget.TextView;

public class MainActivity extends SplashActivity {

    @Override
    public LinearLayout createSplashLayout() {
       LinearLayout view = new LinearLayout(this);
       TextView text = new TextView(this);
       Typeface type = Typeface.createFromAsset(getAssets(),"fonts/RobotoCondensed-Regular.ttf");

       view.setBackgroundColor(Color.parseColor("#009999"));
       view.setGravity(Gravity.CENTER);

       text.setText("Flow Academy© PubApp");
       text.setTextColor(Color.parseColor("#ffffff"));
       text.setGravity(Gravity.CENTER);
       text.setTypeface(type);
       text.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 60);

       view.addView(text);

       return view;
    }
}